import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NanGenerator } from '.';

describe('create NaNs', () => {
	const transform = new Transformer().extend([NanGenerator]);

	test('produces a valid NaN', () => {
		expect(transform).toProduce(z.nan());
	});

	test('creates a NaN', () => {
		expect(Number.isNaN(transform.from(z.nan()))).toBeTruthy();
	});
});
