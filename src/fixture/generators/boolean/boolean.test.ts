import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { BooleanGenerator } from '.';

describe('create booleans', () => {
	const transform = new Transformer().extend([BooleanGenerator]);

	test('produces a valid boolean', () => {
		expect(transform).toReasonablySatisfy(z.boolean());
	});

	test('creates a boolean', () => {
		expect(transform.from(z.boolean())).toBeTypeOf('boolean');
	});

	test('alternates between boolean values', () => {
		const one = transform.from(z.boolean());
		const two = transform.from(z.boolean());
		const three = transform.from(z.boolean());
		const four = transform.from(z.boolean());

		expect(one).not.toBe(two);
		expect(one).toBe(three);
		expect(two).toBe(four);
	});
});
