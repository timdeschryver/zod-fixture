import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NanGenerator } from '.';

describe('create NaNs', () => {
	const core = new Transformer().extend([NanGenerator]);

	test('produces a valid NaN', () => {
		expect(core).toProduce(z.nan());
	});

	test('creates a NaN', () => {
		expect(Number.isNaN(core.from(z.nan()))).toBeTruthy();
	});
});
