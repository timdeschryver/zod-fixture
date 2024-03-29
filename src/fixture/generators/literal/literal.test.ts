import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { LiteralGenerator } from '.';

describe('create literals', () => {
	const transform = new ConstrainedTransformer().extend([LiteralGenerator]);

	test('produces a valid literal', () => {
		expect(transform).toReasonablySatisfy(z.literal('tuna'));
	});

	test('creates a string literal and returns its value', () => {
		expect(transform.fromSchema(z.literal('tuna'))).toBe('tuna');
	});

	test('creates a number literal and returns its value', () => {
		expect(transform.fromSchema(z.literal(12))).toBe(12);
	});

	test('creates a boolean literal and returns its value', () => {
		expect(transform.fromSchema(z.literal(true))).toBe(true);
	});
});
