import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { BooleanGenerator } from '.';

describe('create booleans', () => {
	const core = new Core().register([BooleanGenerator]);

	test('creates a boolean', () => {
		expect(core.generate(z.boolean(), { path: [] })).toBeTypeOf('boolean');
	});

	test('alternates between boolean values', () => {
		const one = core.generate(z.boolean(), { path: [] });
		const two = core.generate(z.boolean(), { path: [] });
		const three = core.generate(z.boolean(), { path: [] });
		const four = core.generate(z.boolean(), { path: [] });

		expect(one).not.toBe(two);
		expect(one).toBe(three);
		expect(two).toBe(four);
	});
});