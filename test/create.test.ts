import type { RefinementCtx, ZodTypeAny } from 'zod';
import { describe, expect, test, vi } from 'vitest';
import { createFixture } from '../src';
import { isCuid } from 'cuid';
import { isCuid as isCuid2 } from '@paralleldrive/cuid2';
import { z } from 'zod';

test('throws on invalid schema type', () => {
	const zodType = {
		_def: {
			typeName: 'I_DONT_EXIST',
		},
	} as ZodTypeAny;
	expect(() => createFixture(zodType)).toThrowError(zodType._def.typeName);
});

test('disables checks added by zod', () => {
	const result = createFixture(
		z.object({
			number: z.number().min(9000),
			string: z.string().min(9000),
		}),
		{ ignoreChecks: true },
	);

	expect(result.number).toBeLessThan(9000);
	expect(result.string.length).toBeLessThan(9000);
});

describe('create strings', () => {
	test('creates a string', () => {
		expect(createFixture(z.string())).toBeTypeOf('string');
	});

	test('creates a nullable string', () => {
		expect(createFixture(z.string().nullable())).toBeTypeOf('string');
		expect(createFixture(z.string().nullish())).toBeTypeOf('string');
		expect(createFixture(z.string().optional())).toBeTypeOf('string');
	});

	test('creates a string with a fixed length', () => {
		expect(createFixture(z.string().length(5))).toHaveLength(5);
	});

	test('creates a string with a min length', () => {
		expect(createFixture(z.string().min(100)).length).toBeGreaterThanOrEqual(
			100,
		);
	});

	test('creates a string with a max length', () => {
		expect(createFixture(z.string().max(2))).toHaveLength(2);
	});

	test('throws when min is greater than max', () => {
		expect(() => createFixture(z.string().min(50).max(40))).toThrowError();
	});

	test('throws when min is negative', () => {
		expect(() => createFixture(z.string().min(-1))).toThrowError();
	});

	test('creates a string that is a uuid', () => {
		expect(createFixture(z.string().uuid())).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
		);
	});

	test('creates a string that is a cuid', () => {
		expect(isCuid(createFixture(z.string().cuid()))).toBeTruthy()
	});

	test('creates a string that is a cuid2', () => {
		expect(isCuid2(createFixture(z.string().cuid2()))).toBeTruthy()
	});

	test('creates a string that is an email', () => {
		const email = createFixture(z.string().email());
		expect(email).include('@');
		expect(email).include('.');
	});

	test('creates a string that startsWith', () => {
		const value = createFixture(z.string().startsWith('start_'));
		expect(value.startsWith('start_')).toBeTruthy();
	});

	test('creates a string that endsWith', () => {
		const value = createFixture(z.string().endsWith('_end'));
		expect(value.endsWith('_end')).toBeTruthy();
	});
	
	test('creates a string that startsWith and endsWith', () => {
		const value = createFixture(z.string().startsWith('start_').endsWith('_end'));
		expect(value.startsWith('start_')).toBeTruthy();
		expect(value.endsWith('_end')).toBeTruthy();
	});
});

describe('create numbers', () => {
	test('creates a number between 1 and 500', () => {
		const result = createFixture(z.number());

		expect(result).toBeTypeOf('number');
		expect(result).toBeGreaterThanOrEqual(1);
		expect(result).toBeLessThanOrEqual(500);
	});

	test('creates a number with a min value', () => {
		expect(createFixture(z.number().min(10_000))).toBeGreaterThanOrEqual(
			10_000,
		);
		expect(createFixture(z.number().gte(10_000))).toBeGreaterThanOrEqual(
			10_000,
		);
	});

	test('creates a number with a negative min value', () => {
		expect(createFixture(z.number().min(-10))).toBeGreaterThanOrEqual(-10);
	});

	test('creates a number with a max value', () => {
		expect(createFixture(z.number().max(5))).toBeLessThanOrEqual(5);
		expect(createFixture(z.number().lte(5))).toBeLessThanOrEqual(5);
	});

	test('creates a number with a negative max value', () => {
		expect(createFixture(z.number().max(-5))).toBeLessThanOrEqual(-5);
	});

	test('creates a number with a negative max value', () => {
		const result = createFixture(z.number().min(-10).max(-5));
		expect(result).toBeGreaterThanOrEqual(-10);
		expect(result).toBeLessThanOrEqual(-5);
	});

	test('creates a positive number', () => {
		expect(createFixture(z.number().positive())).toBeGreaterThan(0);
		expect(createFixture(z.number().nonnegative())).toBeGreaterThanOrEqual(0);
	});

	test('creates a negative number', () => {
		expect(createFixture(z.number().negative())).toBeLessThan(0);
		expect(createFixture(z.number().nonpositive())).toBeLessThanOrEqual(0);
	});

	test('throws when min is greater than max', () => {
		expect(() => createFixture(z.number().min(100).max(10))).toThrowError();
	});

	test('creates a bigint between 1 and MAX_SAFE_INTEGER', () => {
		const result = createFixture(z.bigint());

		expect(result).toBeTypeOf('bigint');
		expect(result).toBeGreaterThanOrEqual(1);
		expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
	});

	test('creates a nullable number', () => {
		expect(createFixture(z.number().nullable())).toBeTypeOf('number');
		expect(createFixture(z.number().nullish())).toBeTypeOf('number');
		expect(createFixture(z.number().optional())).toBeTypeOf('number');
	});
});

describe('create booleans', () => {
	test('creates a boolean', () => {
		expect(createFixture(z.boolean())).toBeTypeOf('boolean');
	});

	test('alternates between boolean values', () => {
		const one = createFixture(z.boolean());
		const two = createFixture(z.boolean());
		const three = createFixture(z.boolean());
		const four = createFixture(z.boolean());

		expect(one).not.toBe(two);
		expect(one).toBe(three);
		expect(two).toBe(four);
	});

	test('creates a nullable boolean', () => {
		expect(createFixture(z.boolean().nullable())).toBeTypeOf('boolean');
		expect(createFixture(z.boolean().nullish())).toBeTypeOf('boolean');
		expect(createFixture(z.boolean().optional())).toBeTypeOf('boolean');
	});
});

describe('create dates', () => {
	const two_years = 31536000000 * 2;
	test('creates a date within a range of min plus 2 years from today', () => {
		const result = createFixture(z.date());

		expect(result).toBeInstanceOf(Date);
		expect(result.getTime()).toBeGreaterThanOrEqual(
			new Date().getTime() - two_years,
		);
		expect(result.getTime()).toBeLessThanOrEqual(
			new Date().getTime() + two_years,
		);
	});

	test('creates a date with a min value', () => {
		const result = createFixture(z.date().min(new Date(2050, 5, 16)));
		expect(result.getTime()).toBeGreaterThanOrEqual(
			new Date(2050, 5, 16).getTime(),
		);
	});

	test('creates a date with a max value', () => {
		const result = createFixture(z.date().max(new Date(1991, 10, 20)));
		expect(result.getTime()).toBeLessThanOrEqual(
			new Date(1991, 10, 20).getTime(),
		);
	});

	test('throws when min is greater then max', () => {
		expect(() =>
			createFixture(
				z.date().min(new Date(2025, 1, 1)).max(new Date(1991, 10, 20)),
			),
		).toThrow();
	});

	test('creates a nullable date', () => {
		expect(createFixture(z.date().nullable())).toBeInstanceOf(Date);
		expect(createFixture(z.date().nullish())).toBeInstanceOf(Date);
		expect(createFixture(z.date().optional())).toBeInstanceOf(Date);
	});
});

describe('create empty types', () => {
	test('creates an undefined', () => {
		expect(createFixture(z.undefined())).toBeUndefined();
	});

	test('creates a null', () => {
		expect(createFixture(z.null())).toBeNull();
	});

	test('creates a void', () => {
		const result = createFixture(z.void());
		expect(result).toBeTypeOf('function');
		expect((result as unknown as () => void)()).toBeUndefined();
	});
});

describe('create catch-all types', () => {
	test('creates an any as null', () => {
		expect(createFixture(z.any())).toBeNull();
	});

	test('creates an unknown as null', () => {
		expect(createFixture(z.unknown())).toBeNull();
	});

	test('creates never as null', () => {
		expect(createFixture(z.never())).toBeNull();
	});
});

describe('create objects', () => {
	test('creates an empty object', () => {
		expect(createFixture(z.object({}))).toBeTypeOf('object');
	});

	test('creates a nullable empty object', () => {
		expect(createFixture(z.object({}).nullable())).toBeTypeOf('object');
		expect(createFixture(z.object({}).optional())).toBeTypeOf('object');
		expect(createFixture(z.object({}).nullish())).toBeTypeOf('object');
	});

	test('creates an object', () => {
		const result = createFixture(
			z.object({
				str: z.string(),
				num: z.number(),
				date: z.date(),
			}),
		);
		expect(result).toBeTypeOf('object');
		expect(result.str).toBeTypeOf('string');
		expect(result.str).toContain('str');
		expect(result.num).toBeTypeOf('number');
		expect(result.date).toBeInstanceOf(Date);
	});

	test('creates a nested object', () => {
		const result = createFixture(
			z.object({
				str: z.string(),
				nested: z.object({
					num: z.number(),
					date: z.date(),
				}),
			}),
		);
		expect(result).toBeTypeOf('object');
		expect(result.str).toBeTypeOf('string');
		expect(result.str).toContain('str');
		expect(result.nested.num).toBeTypeOf('number');
		expect(result.nested.date).toBeInstanceOf(Date);
	});

	test("creates an object with zod's api", () => {
		const BaseTeacher = z.object({ students: z.array(z.string()) });
		const HasID = z.object({ id: z.string() });
		const Teacher = BaseTeacher.merge(HasID);

		const result = createFixture(Teacher);
		expect(result).toBeTypeOf('object');
		expect(result.id).toBeTypeOf('string');
		expect(result.id).toContain('id');
		expect(result.students).toHaveLength(3);
	});

	test('creates object with optional value ', () => {
		const SampleWithOptionalValueSchema = z.object({
			name: z.string().optional(),
			modify: z.boolean().optional(),
		});
		expect(() => {
			createFixture(SampleWithOptionalValueSchema);
		}).not.toThrow();
	});

	test('creates object with transform', () => {
		const schema = z
			.object({
				v: z.string(),
			})
			.transform(v => v);

		expect(() => {
			createFixture(schema);
		}).not.toThrow();
	});
});

describe('create Records', () => {
	test('creates a record with 3 entries', () => {
		const result = createFixture(z.record(z.number()));
		expect(Object.keys(result)).toHaveLength(3);
		expect(Object.keys(result)[0]).toBeTypeOf('string');
		expect(Object.values(result)[0]).toBeTypeOf('number');
	});

	test('creates a record with a default length', () => {
		const result = createFixture(z.record(z.number()), { defaultLength: 8 });
		expect(Object.keys(result)).toHaveLength(8);
	});

	test('creates a record with a defined key type', () => {
		const result = createFixture(z.record(z.number(), z.string()));
		expect(Number(Object.keys(result)[0])).toBeTypeOf('number');
		expect(Object.values(result)[0]).toBeTypeOf('string');
	});
});

describe('create Maps', () => {
	test('creates a Map with 3 entries', () => {
		const result = createFixture(z.map(z.string(), z.number()));
		expect(result.size).toBe(3);
		expect([...result.keys()][0]).toBeTypeOf('string');
		expect([...result.values()][0]).toBeTypeOf('number');
	});

	test('creates a Map with a default length', () => {
		const result = createFixture(z.map(z.string(), z.number()), {
			defaultLength: 2,
		});
		expect(result.size).toBe(2);
	});
});

describe('create Sets', () => {
	test('creates a Set with 3 entries', () => {
		const result = createFixture(z.set(z.number()));
		expect(result.size).toBe(3);
		expect([...result.keys()][0]).toBeTypeOf('number');
		expect([...result.values()][0]).toBeTypeOf('number');
	});

	test('creates a Set with a default length', () => {
		const result = createFixture(z.set(z.number()), { defaultLength: 6 });
		expect(result.size).toBe(6);
	});
});

describe('create Arrays', () => {
	test('creates an array with the length of 3', () => {
		expect(createFixture(z.array(z.string()))).toHaveLength(3);
		expect(createFixture(z.number().array())).toHaveLength(3);
	});

	test('creates an array with a default length', () => {
		expect(
			createFixture(z.array(z.string()), { defaultLength: 7 }),
		).toHaveLength(7);
	});

	test('creates an array with a min length', () => {
		const result = createFixture(z.array(z.string()).min(10), {
			defaultLength: 7,
		});
		expect(result).toHaveLength(10);
	});

	test('creates an array with a max length', () => {
		expect(
			createFixture(z.array(z.string()).max(10), { defaultLength: 7 }).length,
		).toBeLessThanOrEqual(10);
	});

	test('creates an array between two lengths', () => {
		const result = createFixture(z.array(z.string()).min(6).max(10), {
			defaultLength: 20,
		});
		expect(result.length).toBeGreaterThanOrEqual(6);
		expect(result.length).toBeLessThanOrEqual(10);
	});

	test('throws when min is greater than max', () => {
		expect(() =>
			createFixture(z.array(z.string()).min(10).max(5)),
		).toThrowError();
	});
});

describe('create Tuples', () => {
	test('creates a tuple and preserves types', () => {
		const result = createFixture(
			z.tuple([
				z.string(), // name
				z.number(), // jersey number
				z.object({
					pointsScored: z.number(),
				}), // statistics
			]),
		);
		expect(result).toHaveLength(3);
		expect(result[0]).toBeTypeOf('string');
		expect(result[1]).toBeTypeOf('number');
		expect(result[2]).toBeTypeOf('object');
		expect(result[2].pointsScored).toBeTypeOf('number');
	});
});

describe('create enums', () => {
	test('using zod enums creates an enum and returns a random value', () => {
		expect(createFixture(z.enum(['Salmon', 'Tuna', 'Trout']))).toMatch(
			/^Salmon|Tuna|Trout$/,
		);
	});

	test('using numeric native enums creates an enum and returns a random value', () => {
		enum Fruits {
			Apple,
			Banana,
		}

		expect(createFixture(z.nativeEnum(Fruits))).toMatch(/^0|1/);
	});

	test('using string native enums creates an enum and returns a random value', () => {
		enum Fruits {
			Apple = 'apple',
			Banana = 'banana',
			Cantaloupe = 3, // you can mix numerical and string enums
		}

		expect(createFixture(z.nativeEnum(Fruits))).toMatch(/^apple|banana|3$/);
	});

	test('using const native enums creates an enum and returns a random value', () => {
		const Fruits = {
			Apple: 'apple',
			Banana: 'banana',
			Cantaloupe: 3,
		} as const;

		expect(createFixture(z.nativeEnum(Fruits))).toMatch(/^apple|banana|3$/);
	});
});

describe('create unions', () => {
	test('creates a union value', () => {
		expect(typeof createFixture(z.union([z.string(), z.number()]))).toMatch(
			/^string|number$/,
		);
	});

	test('creates a union value with the or syntax', () => {
		expect(typeof createFixture(z.string().or(z.number()))).toMatch(
			/^string|number$/,
		);
	});

	test('creates a discriminated union', () => {
		const result = createFixture(
			z.discriminatedUnion('type', [
				z.object({ type: z.literal('a'), a: z.string() }),
				z.object({ type: z.literal('b'), b: z.string() }),
			]),
		);
		expect(result.type).toBeTypeOf('string');
		expect(result.type).toMatch(/^a|b$/);
	});
});

describe('create literals', () => {
	test('creates a string literal and returns its value', () => {
		expect(createFixture(z.literal('tuna'))).toBe('tuna');
	});

	test('creates a number literal and returns its value', () => {
		expect(createFixture(z.literal(12))).toBe(12);
	});

	test('creates a boolean literal and returns its value', () => {
		expect(createFixture(z.literal(true))).toBe(true);
	});
});

describe('create NaNs', () => {
	test('creates a NaN', () => {
		expect(Number.isNaN(createFixture(z.nan()))).toBeTruthy();
	});
});

describe('create Functions', () => {
	test('creates a function', () => {
		expect(createFixture(z.function())).toBeTypeOf('function');
	});
});

describe('usage with effects', () => {
	test('invokes transform', () => {
		const mockTransform = vi.fn(() => 0);
		const result = createFixture(z.string().transform(mockTransform));
		expect(mockTransform).toBeCalled();
		expect(result).toBe(0);
	});

	test('invokes nested transforms', () => {
		const mockStringTransform = vi.fn<[string, RefinementCtx], number>(() => 0);
		const mockObjectTransform = vi.fn<
			[Record<string, unknown>, RefinementCtx],
			unknown
		>((input: Record<string, unknown>) => input.someValue);
		const result = createFixture(
			z
				.object({
					someValue: z.string().transform(mockStringTransform),
				})
				.transform(mockObjectTransform),
		);
		expect(mockStringTransform).toBeCalled();
		expect(mockStringTransform.mock.calls[0][1]).toStrictEqual({
			addIssue: expect.any(Function),
			path: ['someValue'],
		});
		expect(mockObjectTransform).toBeCalled();
		expect(mockObjectTransform.mock.calls[0][1]).toStrictEqual({
			addIssue: expect.any(Function),
			path: [],
		});
		expect(result).toBe(0);
	});

	test('does not invoke preprocess', () => {
		const spy = vi.fn(() => 0);
		const result = createFixture(z.preprocess(spy, z.string()));
		expect(spy).not.toBeCalled();
		expect(result).toBeTypeOf('string');
	});

	test('does not invoke refine', () => {
		const spy = vi.fn(() => 0);
		const result = createFixture(z.string().refine(spy));
		expect(spy).not.toBeCalled();
		expect(result).toBeTypeOf('string');
	});

	test('does not invoke superRefine', () => {
		const spy = vi.fn(() => 0);
		const result = createFixture(z.string().superRefine(spy));
		expect(spy).not.toBeCalled();
		expect(result).toBeTypeOf('string');
	});
});
