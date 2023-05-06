import { Core } from '@/core/core';
import { describe, expect, test, vi } from 'vitest';
import { z } from 'zod';

describe('usage with effects', () => {
	const core = new Core().register([]);

	test('does not invoke transform', () => {
		const spy = vi.fn(() => 0);
		const result = core.generate(z.string().transform(spy));
		expect(spy).not.toBeCalled();
		expect(result).toBeTypeOf('string');
	});

	test('does not invoke preprocess', () => {
		const spy = vi.fn(() => 0);
		const result = core.generate(z.preprocess(spy, z.string()));
		expect(spy).not.toBeCalled();
		expect(result).toBeTypeOf('string');
	});

	test('does not invoke refine', () => {
		const spy = vi.fn(() => 0);
		const result = core.generate(z.string().refine(spy));
		expect(spy).not.toBeCalled();
		expect(result).toBeTypeOf('string');
	});

	test('does not invoke superRefine', () => {
		const spy = vi.fn(() => 0);
		const result = core.generate(z.string().superRefine(spy));
		expect(spy).not.toBeCalled();
		expect(result).toBeTypeOf('string');
	});
});
