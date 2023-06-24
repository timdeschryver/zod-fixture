import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NumberGenerator } from '.';

describe('create numbers', () => {
	const core = new Core().register([NumberGenerator]);

	test(`creates a number between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER`, () => {
		const result = core.generate(z.number());

		expect(result).toBeTypeOf('number');
		expect(result).toBeGreaterThanOrEqual(Number.MIN_SAFE_INTEGER);
		expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
	});

	test("creates a number that's an int", () => {
		expect(core.generate(z.number().int())).toBeTypeOf('number');
	});

	describe('min and max', () => {
		test('creates a number with a min value', () => {
			expect(core.generate(z.number().min(10_000))).toBeGreaterThanOrEqual(
				10_000
			);
			expect(core.generate(z.number().gte(10_000))).toBeGreaterThanOrEqual(
				10_000
			);
		});

		test('creates a number with a negative min value', () => {
			expect(core.generate(z.number().min(-10))).toBeGreaterThanOrEqual(-10);
		});

		test('creates a number with a max value', () => {
			expect(core.generate(z.number().max(5))).toBeLessThanOrEqual(5);
			expect(core.generate(z.number().lte(5))).toBeLessThanOrEqual(5);
		});

		test('creates a number with a negative max value', () => {
			expect(core.generate(z.number().max(-5))).toBeLessThanOrEqual(-5);
		});

		test('creates a number with a negative max value', () => {
			const result = core.generate(z.number().min(-10).max(-5));
			expect(result).toBeGreaterThanOrEqual(-10);
			expect(result).toBeLessThanOrEqual(-5);
		});

		test('throws when min is greater than max', () => {
			expect(() => core.generate(z.number().min(100).max(10))).toThrowError();
		});
	});

	describe('positive and negative', () => {
		test('creates a positive number', () => {
			expect(core.generate(z.number().positive())).toBeGreaterThan(0);
			expect(core.generate(z.number().nonnegative())).toBeGreaterThanOrEqual(0);
		});

		test('creates a negative number', () => {
			expect(core.generate(z.number().negative())).toBeLessThan(0);
			expect(core.generate(z.number().nonpositive())).toBeLessThanOrEqual(0);
		});
	});

	describe('multipleOf', () => {
		test("creates a number that's a multiple", () => {
			const schema = z.number().multipleOf(4);
			const result = core.generate(schema);
			expect(() => schema.parse(result)).not.toThrow();
		});

		test("creates a number that's a multiple with min and max", () => {
			expect(core.generate(z.number().multipleOf(3).min(16).max(20))).toBe(18);
		});

		test("creates a number that's a multiple of a decimal", () => {
			expect(core.generate(z.number().multipleOf(3.3).min(16).max(19))).toBe(
				16.5
			);
		});
	});

	test('creates a finite number', () => {
		expect(isFinite(core.generate(z.number().finite()) as number)).toBeTruthy();
	});

	test("creates a number that's a multiple", () => {
		const schema = z.number().multipleOf(4);
		expect(core).toProduce(schema);
	});
});
