import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NanGenerator } from '.';

describe('create NaNs', () => {
	const core = new Core().register([NanGenerator]);

	test('produces a valid NaN', () => {
		expect(core).toProduce(z.nan());
	});

	test('creates a NaN', () => {
		expect(Number.isNaN(core.generate(z.nan()))).toBeTruthy();
	});
});
