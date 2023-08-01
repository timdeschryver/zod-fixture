import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { BooleanGenerator } from '.';
import { ArrayGenerator } from '../array';

describe('create booleans', () => {
	const transform = new ConstrainedTransformer().extend([
		ArrayGenerator,
		BooleanGenerator,
	]);
	const schema = z.boolean();

	test('produces a valid boolean', () => {
		expect(transform).toReasonablySatisfy(schema);
	});

	test('creates a boolean', () => {
		expect(transform.fromSchema(schema)).toBeTypeOf('boolean');
	});

	test('alternates between boolean values', () => {
		const result1 = transform.fromSchema(schema.array(), {
			seed: 1,
			array: { min: 20, max: 20 },
		});

		expect(result1).toStrictEqual([
			false,
			true,
			false,
			true,
			false,
			true,
			false,
			true,
			false,
			true,
			false,
			true,
			false,
			true,
			false,
			true,
			false,
			true,
			false,
			true,
		]);
	});

	test('deterministicly generate boolean values', () => {
		const one = transform.fromSchema(schema, {
			seed: 1,
		});
		const two = transform.fromSchema(schema, {
			seed: 2,
		});
		const three = transform.fromSchema(schema, {
			seed: 3,
		});

		expect(one).toBe(false);
		expect(two).toBe(false);
		expect(three).toBe(true);
	});
});
