import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { DateGenerator } from '.';

describe('create dates', () => {
	const core = new Transformer().extend([DateGenerator]);

	test('produces a valid date', () => {
		expect(core).toProduce(z.date());
	});

	test('creates a date', () => {
		const result = core.from(z.date());
		expect(result).toBeInstanceOf(Date);
	});

	test('produces a valid date using min and max', () => {
		expect(core).toProduce(
			z.date().min(new Date(2020, 1, 1)).max(new Date(2022, 12, 31))
		);
	});

	test('creates a date with a min value', () => {
		const result = core.from(z.date().min(new Date(2050, 5, 16)));
		expect((result as Date).getTime()).toBeGreaterThanOrEqual(
			new Date(2050, 5, 16).getTime()
		);
	});

	test('creates a date with a max value', () => {
		const result = core.from(z.date().max(new Date(1991, 10, 20)));
		expect((result as Date).getTime()).toBeLessThanOrEqual(
			new Date(1991, 10, 20).getTime()
		);
	});

	test('throws when min is greater then max', () => {
		expect(() =>
			core.from(z.date().min(new Date(2025, 1, 1)).max(new Date(1991, 10, 20)))
		).toThrow();
	});
});
