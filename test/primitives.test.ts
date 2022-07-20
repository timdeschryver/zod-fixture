import { expect, test } from 'vitest';
import { create } from '../src';
import { z } from 'zod';

test('creates a string', () => {
	expect(typeof create(z.string())).toBe('string');
});

test('creates a number', () => {
	expect(typeof create(z.number())).toBe('number');
});

test('creates a boolean', () => {
	expect(typeof create(z.boolean())).toBe('boolean');
});
