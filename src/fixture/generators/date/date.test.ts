import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { DateGenerator } from '.';

describe('create dates', () => {
	const transform = new ConstrainedTransformer().extend([DateGenerator]);

	test('produces a valid date', () => {
		expect(transform).toReasonablySatisfy(z.date());
	});

	test('creates a date', () => {
		const result = transform.fromSchema(z.date());
		expect(result).toBeInstanceOf(Date);
	});

	test('produces a valid date using min and max', () => {
		expect(transform).toReasonablySatisfy(
			z.date().min(new Date(2020, 1, 1)).max(new Date(2022, 12, 31))
		);
	});

	test('creates a date with a min value', () => {
		const result = transform.fromSchema(z.date().min(new Date(2050, 5, 16)));
		expect((result as Date).getTime()).toBeGreaterThanOrEqual(
			new Date(2050, 5, 16).getTime()
		);
	});

	test('creates a date with a max value', () => {
		const result = transform.fromSchema(z.date().max(new Date(1991, 10, 20)));
		expect((result as Date).getTime()).toBeLessThanOrEqual(
			new Date(1991, 10, 20).getTime()
		);
	});

	test('throws when min is greater then max', () => {
		expect(() =>
			transform.fromSchema(
				z.date().min(new Date(2025, 1, 1)).max(new Date(1991, 10, 20))
			)
		).toThrow();
	});
});
