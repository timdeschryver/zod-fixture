import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { StringGenerator, UrlGenerator } from '.';
import { NullableGenerator } from '../nullable';
import { OptionalGenerator } from '../optional';

describe('create strings', () => {
	const core = new Core().register([StringGenerator, UrlGenerator, NullableGenerator, OptionalGenerator]);

	test('creates a string', () => {
		expect(core.generate(z.string())).toBeTypeOf('string');
	});

	test('creates a string with a fixed length', () => {
		expect(core.generate(z.string().length(5))).toHaveLength(5);
	});

	test('creates a string with a min length', () => {
		expect(
			(core.generate(z.string().min(100)) as string).length,
		).toBeGreaterThanOrEqual(100);
	});

	test('creates a string with a max length', () => {
		expect((core.generate(z.string().max(2)) as string)?.length).toBeLessThanOrEqual(2);
	});

	test('throws when min is greater than max', () => {
		expect(() => core.generate(z.string().min(50).max(40))).toThrowError();
	});

	test('throws when min is negative', () => {
		expect(() => core.generate(z.string().min(-1))).toThrowError();
	});


	test('creates a nullable string', () => {
		expect(core.generate(z.string().nullable())).toBeTypeOf('string');
		expect(core.generate(z.string().nullish())).toBeTypeOf('string');
		expect(core.generate(z.string().optional())).toBeTypeOf('string');
	});
});
