import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { DateGenerator } from '.';

describe('create dates', () => {
	const core = new Core().register([DateGenerator]);

	const two_years = 31536000000 * 2;
	test('creates a date within a range of min plus 2 years from today', () => {
		const result = core.generate(z.date());

		expect(result).toBeInstanceOf(Date);
		expect((result as Date).getTime()).toBeGreaterThanOrEqual(
			new Date().getTime() - two_years,
		);
		expect((result as Date).getTime()).toBeLessThanOrEqual(
			new Date().getTime() + two_years,
		);
	});

	test.skip('creates a date with a min value', () => {
		const result = core.generate(z.date().min(new Date(2050, 5, 16)));
		expect((result as Date).getTime()).toBeGreaterThanOrEqual(
			new Date(2050, 5, 16).getTime(),
		);
	});

	test.skip('creates a date with a max value', () => {
		const result = core.generate(z.date().max(new Date(1991, 10, 20)));
		expect((result as Date).getTime()).toBeLessThanOrEqual(
			new Date(1991, 10, 20).getTime(),
		);
	});

	test.skip('throws when min is greater then max', () => {
		expect(() =>
			core.generate(z.date().min(new Date(2025, 1, 1)).max(new Date(1991, 10, 20))),
		).toThrow();
	});
});
