import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { BooleanGenerator } from '.';

describe('create booleans', () => {
	const transform = new ConstrainedTransformer().extend([BooleanGenerator]);

	test('produces a valid boolean', () => {
		expect(transform).toReasonablySatisfy(z.boolean());
	});

	test('creates a boolean', () => {
		expect(transform.fromSchema(z.boolean())).toBeTypeOf('boolean');
	});

	test('alternates between boolean values', () => {
		const one = transform.fromSchema(z.boolean());
		const two = transform.fromSchema(z.boolean());
		const three = transform.fromSchema(z.boolean());
		const four = transform.fromSchema(z.boolean());

		expect(one).not.toBe(two);
		expect(one).toBe(three);
		expect(two).toBe(four);
	});
});
