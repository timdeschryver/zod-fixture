import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { SetGenerator } from '.';
import { NumberGenerator } from '../number';

describe('create Sets', () => {
	const transform = new Transformer().extend([SetGenerator, NumberGenerator]);

	test('produces a valid set', () => {
		expect(transform).toReasonablySatisfy(z.set(z.number()));
	});

	test('creates a Set with 3 entries', () => {
		const input = z.set(z.number());
		const result = transform.from(input);

		type I = z.infer<typeof input>;

		expect((result as I).size).toBe(3);
		expect([...(result as I).keys()][0]).toBeTypeOf('number');
		expect([...(result as I).values()][0]).toBeTypeOf('number');
	});
});
