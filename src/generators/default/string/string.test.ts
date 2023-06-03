import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { StringGenerator, UrlGenerator } from '.';
import { NullableGenerator } from '../nullable';
import { OptionalGenerator } from '../optional';

describe('create strings', () => {
	const core = new Core().register([StringGenerator, UrlGenerator, NullableGenerator, OptionalGenerator]);

	test('creates a string', () => {
		expect(core.generate(z.string(), { path: [] })).toBeTypeOf('string');
	});

	test('creates a string with a fixed length', () => {
		expect(core.generate(z.string().length(5), { path: [] })).toHaveLength(5);
	});

	test('creates a string with a min length', () => {
		expect(
			(core.generate(z.string().min(100), { path: [] }) as string).length,
		).toBeGreaterThanOrEqual(100);
	});

	test('creates a string with a max length', () => {
		expect((core.generate(z.string().max(2), { path: [] }) as string)?.length).toBeLessThanOrEqual(2);
	});

	test('throws when min is greater than max', () => {
		expect(() => core.generate(z.string().min(50).max(40), { path: [] })).toThrowError();
	});

	test('throws when min is negative', () => {
		expect(() => core.generate(z.string().min(-1), { path: [] })).toThrowError();
	});

	test('creates a string that is a uuid', () => {
		expect(createFixture(z.string().uuid())).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
		);
	});

	// test('creates a string that is a cuid', () => {
	// 	expect(isCuid(createFixture(z.string().cuid()))).toBeTruthy();
	// });

	// test('creates a string that is a cuid2', () => {
	// 	expect(isCuid2(createFixture(z.string().cuid2()))).toBeTruthy();
	// });

	// test('creates a string that is an email', () => {
	// 	const email = createFixture(z.string().email());
	// 	expect(email).include('@');
	// 	expect(email).include('.');
	// });

	// test('creates a string that startsWith', () => {
	// 	const value = createFixture(z.string().startsWith('start_'));
	// 	expect(value.startsWith('start_')).toBeTruthy();
	// });

	// test('creates a string that endsWith', () => {
	// 	const value = createFixture(z.string().endsWith('_end'));
	// 	expect(value.endsWith('_end')).toBeTruthy();
	// });

	// test('creates a string that startsWith and endsWith', () => {
	// 	const value = createFixture(
	// 		z.string().startsWith('start_').endsWith('_end'),
	// 	);
	// 	expect(value.startsWith('start_')).toBeTruthy();
	// 	expect(value.endsWith('_end')).toBeTruthy();
	// });


	test('creates a nullable string', () => {
		expect(core.generate(z.string().nullable(), { path: [] })).toBeTypeOf('string');
		expect(core.generate(z.string().nullish(), { path: [] })).toBeTypeOf('string');
		expect(core.generate(z.string().optional(), { path: [] })).toBeTypeOf('string');
	});
});
