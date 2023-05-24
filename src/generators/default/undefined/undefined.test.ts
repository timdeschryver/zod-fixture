import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { UndefinedGenerator } from '.';

describe('create empty types', () => {
	const core = new Core().register([UndefinedGenerator]);

	test('creates an undefined', () => {
		expect(core.generate(z.undefined(), { path: [] })).toBeUndefined();
	});
});
