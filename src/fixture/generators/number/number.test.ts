import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NumberGenerator } from '.';

describe('create numbers', () => {
	const transform = new ConstrainedTransformer().extend([NumberGenerator]);

	test('produces a valid number', () => {
		expect(transform).toReasonablySatisfy(z.number());
	});

	test(`creates a number between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER`, () => {
		const result = transform.fromSchema(z.number());

		expect(result).toBeTypeOf('number');
		expect(result).toBeGreaterThanOrEqual(Number.MIN_SAFE_INTEGER);
		expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
	});

	test("creates a number that's an int", () => {
		expect(transform.fromSchema(z.number().int())).toBeTypeOf('number');
	});

	describe('min and max', () => {
		test('produces a valid number', () => {
			expect(transform).toReasonablySatisfy(z.number().min(10).max(20));
		});

		test('creates a number with a min value', () => {
			expect(transform.fromSchema(z.number().min(100))).toBeGreaterThanOrEqual(
				100
			);
			expect(transform.fromSchema(z.number().gte(100))).toBeGreaterThanOrEqual(
				100
			);
		});

		test('creates a number with a negative min value', () => {
			expect(transform.fromSchema(z.number().min(-10))).toBeGreaterThanOrEqual(
				-10
			);
		});

		test('creates a number with a max value', () => {
			expect(transform.fromSchema(z.number().max(5))).toBeLessThanOrEqual(5);
			expect(transform.fromSchema(z.number().lte(5))).toBeLessThanOrEqual(5);
		});

		test('creates a number with a negative max value', () => {
			expect(transform.fromSchema(z.number().max(-5))).toBeLessThanOrEqual(-5);
		});

		test('creates a number with a negative max value', () => {
			const result = transform.fromSchema(z.number().min(-10).max(-5));
			expect(result).toBeGreaterThanOrEqual(-10);
			expect(result).toBeLessThanOrEqual(-5);
		});

		test('throws when min is greater than max', () => {
			expect(() =>
				transform.fromSchema(z.number().min(100).max(10))
			).toThrowError();
		});
	});

	describe('positive and negative', () => {
		test('produces a valid positive number', () => {
			expect(transform).toReasonablySatisfy(z.number().positive());
		});

		test('creates a positive number', () => {
			expect(transform.fromSchema(z.number().positive())).toBeGreaterThan(0);
			expect(
				transform.fromSchema(z.number().nonnegative())
			).toBeGreaterThanOrEqual(0);
		});

		test('produces a valid negative number', () => {
			expect(transform).toReasonablySatisfy(z.number().positive());
		});

		test('creates a negative number', () => {
			expect(transform.fromSchema(z.number().negative())).toBeLessThan(0);
			expect(
				transform.fromSchema(z.number().nonpositive())
			).toBeLessThanOrEqual(0);
		});
	});

	describe('multipleOf', () => {
		test('produces a valid multipleOf number', () => {
			expect(transform).toReasonablySatisfy(z.number().multipleOf(33));
		});

		test("creates a number that's a multiple with min and max", () => {
			const schema = z.number().multipleOf(3).min(16).max(20);
			expect(transform).toReasonablySatisfy(schema);
			expect(transform.fromSchema(schema)).toBe(18);
		});

		test("creates a number that's a multiple of a decimal", () => {
			const schema = z.number().multipleOf(3.3).min(16).max(19);
			expect(transform).toReasonablySatisfy(schema);
			expect(transform.fromSchema(schema)).toBe(16.5);
		});
	});

	test('creates a finite number', () => {
		expect(
			isFinite(transform.fromSchema(z.number().finite()) as number)
		).toBeTruthy();
	});
});
