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

	test('deterministicly generate boolean values', () => {
		const result1 = transform.fromSchema(schema.array(), {
			seed: 1,
			array: { min: 20, max: 20 },
		});

		expect(result1).toStrictEqual([
			false,
			false,
			false,
			true,
			true,
			true,
			false,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			false,
			true,
			false,
			false,
			false,
			true,
		]);

		const result2 = transform.fromSchema(schema.array(), {
			seed: 1,
			array: { min: 20, max: 20 },
		});

		expect(result2).toStrictEqual([
			false,
			false,
			false,
			true,
			true,
			true,
			false,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			false,
			true,
			false,
			false,
			false,
			true,
		]);
	});
});
