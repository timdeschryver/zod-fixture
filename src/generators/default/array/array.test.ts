import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { ArrayGenerator } from '.';
import { NumberGenerator } from '../number';
import { StringGenerator } from '../string';

describe('create Arrays', () => {
	const core = new Core().register([ArrayGenerator, StringGenerator, NumberGenerator]);

	test('creates an array with the length of 3', () => {
		expect(core.generate(z.array(z.string()), { path: [] })).toHaveLength(3);
		expect(core.generate(z.number().array(), { path: [] })).toHaveLength(3);
	});

	test('throws when min is greater than max', () => {
		expect(() =>
			core.generate(z.array(z.string()).min(10).max(5), { path: [] }),
		).toThrowError();
	});
});
