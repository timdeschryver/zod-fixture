import { expect, test } from 'vitest';
import { create } from '../src';
import { z } from 'zod';

test('creates a string', () => {
	expect(typeof create(z.string())).toBe('string');
});

test('creates a nullable string', () => {
	expect(typeof create(z.string().nullable())).toBe('string');
	expect(typeof create(z.string().nullish())).toBe('string');
	expect(typeof create(z.string().optional())).toBe('string');
});

test('creates a number', () => {
	expect(typeof create(z.number())).toBe('number');
});

test('creates a nullable number', () => {
	expect(typeof create(z.number().nullable())).toBe('number');
	expect(typeof create(z.number().nullish())).toBe('number');
	expect(typeof create(z.number().optional())).toBe('number');
});

test('creates a boolean', () => {
	expect(typeof create(z.boolean())).toBe('boolean');
});

test('creates a nullable boolean', () => {
	expect(typeof create(z.boolean().nullable())).toBe('boolean');
	expect(typeof create(z.boolean().nullish())).toBe('boolean');
	expect(typeof create(z.boolean().optional())).toBe('boolean');
});
