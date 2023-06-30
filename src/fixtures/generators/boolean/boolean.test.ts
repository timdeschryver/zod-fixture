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
		expect(core.generate(z.boolean())).toBeTypeOf('boolean');
	});

	test('alternates between boolean values', () => {
		const one = core.generate(z.boolean());
		const two = core.generate(z.boolean());
		const three = core.generate(z.boolean());
		const four = core.generate(z.boolean());

		expect(one).not.toBe(two);
		expect(one).toBe(three);
		expect(two).toBe(four);
	});
});
