import { describe, expect, test } from 'vitest';
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

describe('create strings', () => {
	test('creates a string', () => {
		expect(create(z.string())).toBeTypeOf('string');
	});

	test('creates a nullable string', () => {
		expect(create(z.string().nullable())).toBeTypeOf('string');
		expect(create(z.string().nullish())).toBeTypeOf('string');
		expect(create(z.string().optional())).toBeTypeOf('string');
	});
});

describe('create numbers', () => {
	test('creates a number between 1 and Number.MAX_SAFE_INTEGER', () => {
		const result = create(z.number());

		expect(result).toBeTypeOf('number');
		expect(result).toBeGreaterThanOrEqual(1);
		expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);

		Number.MAX_SAFE_INTEGER;
	});

	test('creates a bigint', () => {
		const result = create(z.bigint());

		expect(result).toBeTypeOf('bigint');
		expect(result).toBeGreaterThanOrEqual(1);
		expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);

		Number.MAX_SAFE_INTEGER;
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
		expect(result.nested.num).toBeTypeOf('number');
		expect(result.nested.date).toBeInstanceOf(Date);
	});
});

describe('create arrays', () => {
	test('creates an array with the length of 3', () => {
		expect(create(z.array(z.string()))).toHaveLength(3);
		expect(create(z.number().array())).toHaveLength(3);
	});
});
