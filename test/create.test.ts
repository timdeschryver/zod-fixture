import { describe, expect, test, vi } from 'vitest';
import type { ZodTypeAny } from 'zod';
import { create } from '../src';
import { z } from 'zod';

test('throws on invalid schema type', () => {
	const zodType = {
		_def: {
			typeName: 'I_DONT_EXIST',
		},
	} as ZodTypeAny;
	expect(() => create(zodType)).toThrowError(zodType._def.typeName);
});

test('disables checks added by zod', () => {
	const result = create(
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
		expect(create(z.string())).toBeTypeOf('string');
	});

	test('creates a nullable string', () => {
		expect(create(z.string().nullable())).toBeTypeOf('string');
		expect(create(z.string().nullish())).toBeTypeOf('string');
		expect(create(z.string().optional())).toBeTypeOf('string');
	});

	test('creates a string with a fixed length', () => {
		expect(create(z.string().length(5))).toHaveLength(5);
	});

	test('creates a string with a min length', () => {
		expect(create(z.string().min(100)).length).toBeGreaterThanOrEqual(100);
	});

	test('creates a string with a max length', () => {
		expect(create(z.string().max(2))).toHaveLength(2);
	});

	test('throws when min is greater than max', () => {
		expect(() => create(z.string().min(50).max(40))).toThrowError();
	});

	test('throws when min is negative', () => {
		expect(() => create(z.string().min(-1))).toThrowError();
	});
});

describe('create numbers', () => {
	test('creates a number between 1 and 500', () => {
		const result = create(z.number());

		expect(result).toBeTypeOf('number');
		expect(result).toBeGreaterThanOrEqual(1);
		expect(result).toBeLessThanOrEqual(500);
	});

	test('creates a number with a min value', () => {
		expect(create(z.number().min(10_000))).toBeGreaterThanOrEqual(10_000);
		expect(create(z.number().gte(10_000))).toBeGreaterThanOrEqual(10_000);
	});

	test('creates a number with a negative min value', () => {
		expect(create(z.number().min(-10))).toBeGreaterThanOrEqual(-10);
	});

	test('creates a number with a max value', () => {
		expect(create(z.number().max(5))).toBeLessThanOrEqual(5);
		expect(create(z.number().lte(5))).toBeLessThanOrEqual(5);
	});

	test('creates a number with a negative max value', () => {
		expect(create(z.number().max(-5))).toBeLessThanOrEqual(-5);
	});

	test('creates a number with a negative max value', () => {
		const result = create(z.number().min(-10).max(-5));
		expect(result).toBeGreaterThanOrEqual(-10);
		expect(result).toBeLessThanOrEqual(-5);
	});

	test('creates a positive number', () => {
		expect(create(z.number().positive())).toBeGreaterThan(0);
		expect(create(z.number().nonnegative())).toBeGreaterThanOrEqual(0);
	});

	test('creates a negative number', () => {
		expect(create(z.number().negative())).toBeLessThan(0);
		expect(create(z.number().nonpositive())).toBeLessThanOrEqual(0);
	});

	test('throws when min is greater than max', () => {
		expect(() => create(z.number().min(100).max(10))).toThrowError();
	});

	test('creates a bigint between 1 and MAX_SAFE_INTEGER', () => {
		const result = create(z.bigint());

		expect(result).toBeTypeOf('bigint');
		expect(result).toBeGreaterThanOrEqual(1);
		expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
	});

	test('creates a nullable number', () => {
		expect(create(z.number().nullable())).toBeTypeOf('number');
		expect(create(z.number().nullish())).toBeTypeOf('number');
		expect(create(z.number().optional())).toBeTypeOf('number');
	});
});

describe('create booleans', () => {
	test('creates a boolean', () => {
		expect(create(z.boolean())).toBeTypeOf('boolean');
	});

	test('alternates between boolean values', () => {
		const one = create(z.boolean());
		const two = create(z.boolean());
		const three = create(z.boolean());
		const four = create(z.boolean());

		expect(one).not.toBe(two);
		expect(one).toBe(three);
		expect(two).toBe(four);
	});

	test('creates a nullable boolean', () => {
		expect(create(z.boolean().nullable())).toBeTypeOf('boolean');
		expect(create(z.boolean().nullish())).toBeTypeOf('boolean');
		expect(create(z.boolean().optional())).toBeTypeOf('boolean');
	});
});

describe('create dates', () => {
	const two_years = 31536000000 * 2;
	test('creates a date within a range of min plus 2 years from today', () => {
		const result = create(z.date());

		expect(result).toBeInstanceOf(Date);
		expect(result.getTime()).toBeGreaterThanOrEqual(
			new Date().getTime() - two_years,
		);
		expect(result.getTime()).toBeLessThanOrEqual(
			new Date().getTime() + two_years,
		);
	});

	test('creates a date with a min value', () => {
		const result = create(z.date().min(new Date(2050, 5, 16)));
		expect(result.getTime()).toBeGreaterThanOrEqual(
			new Date(2050, 5, 16).getTime(),
		);
	});

	test('creates a date with a max value', () => {
		const result = create(z.date().max(new Date(1991, 10, 20)));
		expect(result.getTime()).toBeLessThanOrEqual(
			new Date(1991, 10, 20).getTime(),
		);
	});

	test('throws when min is greater then max', () => {
		expect(() =>
			create(z.date().min(new Date(2025, 1, 1)).max(new Date(1991, 10, 20))),
		).toThrow();
	});

	test('creates a nullable date', () => {
		expect(create(z.date().nullable())).toBeInstanceOf(Date);
		expect(create(z.date().nullish())).toBeInstanceOf(Date);
		expect(create(z.date().optional())).toBeInstanceOf(Date);
	});
});

describe('create empty types', () => {
	test('creates an undefined', () => {
		expect(create(z.undefined())).toBeUndefined();
	});

	test('creates a null', () => {
		expect(create(z.null())).toBeNull();
	});

	test('creates a void', () => {
		const result = create(z.void());
		expect(result).toBeTypeOf('function');
		expect((result as unknown as () => void)()).toBeUndefined();
	});
});

describe('create catch-all types', () => {
	test('creates an any as null', () => {
		expect(create(z.any())).toBeNull();
	});

	test('creates an unknown as null', () => {
		expect(create(z.unknown())).toBeNull();
	});

	test('creates never as null', () => {
		expect(create(z.never())).toBeNull();
	});
});

describe('create objects', () => {
	test('creates an empty object', () => {
		expect(create(z.object({}))).toBeTypeOf('object');
	});

	test('creates a nullable empty object', () => {
		expect(create(z.object({}).nullable())).toBeTypeOf('object');
		expect(create(z.object({}).optional())).toBeTypeOf('object');
		expect(create(z.object({}).nullish())).toBeTypeOf('object');
	});

	test('creates a nested object', () => {
		const result = create(
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

		const result = create(Teacher);
		expect(result).toBeTypeOf('object');
		expect(result.id).toBeTypeOf('string');
		expect(result.id).toContain('id');
		expect(result.students).toHaveLength(3);
	});
});

describe('create records', () => {
	test('creates a record with 3 entries', () => {
		const result = create(z.record(z.number()));
		expect(Object.keys(result)).toHaveLength(3);
		expect(Object.keys(result)[0]).toBeTypeOf('string');
		expect(Object.values(result)[0]).toBeTypeOf('number');
	});

	test('creates a record with a defined key type', () => {
		const result = create(z.record(z.number(), z.string()));
		expect(Number(Object.keys(result)[0])).toBeTypeOf('number');
		expect(Object.values(result)[0]).toBeTypeOf('string');
	});
});

describe('create Maps', () => {
	test('creates a Map with 3 entries', () => {
		const result = create(z.map(z.string(), z.number()));
		expect(result.size).toBe(3);
		expect([...result.keys()][0]).toBeTypeOf('string');
		expect([...result.values()][0]).toBeTypeOf('number');
	});
});

describe('create Sets', () => {
	test('creates a Set with 3 entries', () => {
		const result = create(z.set(z.number()));
		expect(result.size).toBe(3);
		expect([...result.keys()][0]).toBeTypeOf('number');
		expect([...result.values()][0]).toBeTypeOf('number');
	});
});

describe('create arrays', () => {
	test('creates an array with the length of 3', () => {
		expect(create(z.array(z.string()))).toHaveLength(3);
		expect(create(z.number().array())).toHaveLength(3);
	});

	test('creates an array with a min length', () => {
		expect(create(z.array(z.string()).min(10))).toHaveLength(10);
	});

	test('creates an array with a max length', () => {
		expect(create(z.array(z.string()).max(10)).length).toBeLessThanOrEqual(10);
	});

	test('creates an array between two lengths', () => {
		const result = create(z.array(z.string()).min(6).max(10));
		expect(result.length).toBeGreaterThanOrEqual(6);
		expect(result.length).toBeLessThanOrEqual(10);
	});

	test('throws when min is greater than max', () => {
		expect(() => create(z.array(z.string()).min(10).max(5))).toThrowError();
	});
});

describe('create tuples', () => {
	test('creates a tuple and preserves types', () => {
		const result = create(
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

describe('create unions', () => {
	test('creates a union value', () => {
		expect(typeof create(z.union([z.string(), z.number()]))).toMatch(
			/^string|number$/,
		);
	});

	test('creates a union value with the or syntax', () => {
		expect(typeof create(z.string().or(z.number()))).toMatch(/^string|number$/);
	});

	test('creates a discriminated union', () => {
		const result = create(
			z.discriminatedUnion('type', [
				z.object({ type: z.literal('a'), a: z.string() }),
				z.object({ type: z.literal('b'), b: z.string() }),
			]),
		);
		expect(result.type).toBeTypeOf('string');
		expect(result.type).toMatch(/^a|b$/);
	});
});

describe('create enums', () => {
	test('using zod enums creates an enum and returns a random value', () => {
		expect(create(z.enum(['Salmon', 'Tuna', 'Trout']))).toMatch(
			/^Salmon|Tuna|Trout$/,
		);
	});

	test('using numeric native enums creates an enum and returns a random value', () => {
		enum Fruits {
			Apple,
			Banana,
		}

		expect(create(z.nativeEnum(Fruits))).toMatch(/^0|1|Apple|Banana$/);
	});

	test('using string native enums creates an enum and returns a random value', () => {
		enum Fruits {
			Apple = 'apple',
			Banana = 'banana',
			Cantaloupe = 3, // you can mix numerical and string enums
		}

		expect(create(z.nativeEnum(Fruits))).toMatch(
			/^apple|banana|Apple|Banana|Cantaloupe|3$/,
		);
	});

	test('using const native enums creates an enum and returns a random value', () => {
		const Fruits = {
			Apple: 'apple',
			Banana: 'banana',
			Cantaloupe: 3,
		} as const;

		expect(create(z.nativeEnum(Fruits))).toMatch(
			/^apple|banana|Apple|Banana|Cantaloupe|3$/,
		);
	});
});

describe('create literals', () => {
	test('creates a string literal and returns its value', () => {
		expect(create(z.literal('tuna'))).toBe('tuna');
	});

	test('creates a number literal and returns its value', () => {
		expect(create(z.literal(12))).toBe(12);
	});

	test('creates a boolean literal and returns its value', () => {
		expect(create(z.literal(true))).toBe(true);
	});
});

describe('create NaNs', () => {
	test('creates a NaN', () => {
		expect(Number.isNaN(create(z.nan()))).toBeTruthy();
	});
});

describe('create Functions', () => {
	test('creates a function', () => {
		expect(create(z.function())).toBeTypeOf('function');
	});
});

describe('usage with effects', () => {
	test('does not invoke transform', () => {
		const spy = vi.fn(() => 0);
		const result = create(z.string().transform(spy));
		expect(spy).not.toBeCalled();
		expect(result).toBeTypeOf('string');
	});

	test('does not invoke preprocess', () => {
		const spy = vi.fn(() => 0);
		const result = create(z.preprocess(spy, z.string()));
		expect(spy).not.toBeCalled();
		expect(result).toBeTypeOf('string');
	});

	test('does not invoke refine', () => {
		const spy = vi.fn(() => 0);
		const result = create(z.string().refine(spy));
		expect(spy).not.toBeCalled();
		expect(result).toBeTypeOf('string');
	});

	test('does not invoke superRefine', () => {
		const spy = vi.fn(() => 0);
		const result = create(z.string().superRefine(spy));
		expect(spy).not.toBeCalled();
		expect(result).toBeTypeOf('string');
	});
});
