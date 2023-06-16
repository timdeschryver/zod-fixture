import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NanGenerator } from '.';

describe('create NaNs', () => {
	const core = new Core().register([NanGenerator]);

	test('creates a NaN', () => {
		expect(Number.isNaN(core.generate(z.nan()))).toBeTruthy();
	});
});
