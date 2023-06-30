import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NumberGenerator } from '.';

describe('create numbers', () => {
	const transform = new Transformer().extend([NumberGenerator]);

	test('produces a valid number', () => {
		expect(transform).toProduce(z.number());
	});

	test(`creates a number between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER`, () => {
		const result = transform.from(z.number());

		expect(result).toBeTypeOf('number');
		expect(result).toBeGreaterThanOrEqual(Number.MIN_SAFE_INTEGER);
		expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
	});

	test("creates a number that's an int", () => {
		expect(transform.from(z.number().int())).toBeTypeOf('number');
	});

	describe('min and max', () => {
		test('produces a valid number', () => {
			expect(transform).toProduce(z.number().min(10).max(20));
		});

		test('creates a number with a min value', () => {
			expect(transform.from(z.number().min(10_000))).toBeGreaterThanOrEqual(
				10_000
			);
			expect(transform.from(z.number().gte(10_000))).toBeGreaterThanOrEqual(
				10_000
			);
		});

		test('creates a number with a negative min value', () => {
			expect(transform.from(z.number().min(-10))).toBeGreaterThanOrEqual(-10);
		});

		test('creates a number with a max value', () => {
			expect(transform.from(z.number().max(5))).toBeLessThanOrEqual(5);
			expect(transform.from(z.number().lte(5))).toBeLessThanOrEqual(5);
		});

		test('creates a number with a negative max value', () => {
			expect(transform.from(z.number().max(-5))).toBeLessThanOrEqual(-5);
		});

		test('creates a number with a negative max value', () => {
			const result = transform.from(z.number().min(-10).max(-5));
			expect(result).toBeGreaterThanOrEqual(-10);
			expect(result).toBeLessThanOrEqual(-5);
		});

		test('throws when min is greater than max', () => {
			expect(() => transform.from(z.number().min(100).max(10))).toThrowError();
		});
	});

	describe('positive and negative', () => {
		test('produces a valid positive number', () => {
			expect(transform).toProduce(z.number().positive());
		});

		test('creates a positive number', () => {
			expect(transform.from(z.number().positive())).toBeGreaterThan(0);
			expect(transform.from(z.number().nonnegative())).toBeGreaterThanOrEqual(
				0
			);
		});

		test('produces a valid negative number', () => {
			expect(transform).toProduce(z.number().positive());
		});

		test('creates a negative number', () => {
			expect(transform.from(z.number().negative())).toBeLessThan(0);
			expect(transform.from(z.number().nonpositive())).toBeLessThanOrEqual(0);
		});
	});

	describe('multipleOf', () => {
		test('produces a valid multipleOf number', () => {
			expect(transform).toProduce(z.number().multipleOf(33));
		});

		test("creates a number that's a multiple with min and max", () => {
			const schema = z.number().multipleOf(3).min(16).max(20);
			expect(transform).toProduce(schema, 18);
		});

		test("creates a number that's a multiple of a decimal", () => {
			const schema = z.number().multipleOf(3.3).min(16).max(19);
			expect(transform).toProduce(schema, 16.5);
		});
	});

	test('creates a finite number', () => {
		expect(
			isFinite(transform.from(z.number().finite()) as number)
		).toBeTruthy();
	});
});
