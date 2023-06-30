import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { BooleanGenerator } from '.';

describe('create booleans', () => {
	const core = new Transformer().extend([BooleanGenerator]);

	test('produces a valid boolean', () => {
		expect(core).toProduce(z.boolean());
	});

	test('creates a boolean', () => {
		expect(core.from(z.boolean())).toBeTypeOf('boolean');
	});

	test('alternates between boolean values', () => {
		const one = core.from(z.boolean());
		const two = core.from(z.boolean());
		const three = core.from(z.boolean());
		const four = core.from(z.boolean());

		expect(one).not.toBe(two);
		expect(one).toBe(three);
		expect(two).toBe(four);
	});
});
