import { Core } from '@/core/core';
import { isCuid as isCuid2 } from '@paralleldrive/cuid2';
import { isCuid } from 'cuid';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import {
	Cuid2Generator,
	EmailGenerator,
	StringGenerator,
	UrlGenerator,
	UuidGenerator,
} from '.';
import { NullableGenerator } from '../nullable';
import { ObjectGenerator } from '../object';
import { OptionalGenerator } from '../optional';

describe('create strings', () => {
	const core = new Core().register([
		UuidGenerator,
		Cuid2Generator,
		UrlGenerator,
		EmailGenerator,
		StringGenerator,
		NullableGenerator,
		OptionalGenerator,
		ObjectGenerator,
	]);

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
		expect(
			(core.generate(z.string().max(2), { path: [] }) as string)?.length,
		).toBeLessThanOrEqual(2);
	});

	test('throws when min is greater than max', () => {
		expect(() =>
			core.generate(z.string().min(50).max(40), { path: [] }),
		).toThrowError();
	});

	test('throws when min is negative', () => {
		expect(() =>
			core.generate(z.string().min(-1), { path: [] }),
		).toThrowError();
	});

	test('creates a string that is a uuid', () => {
		expect(core.generate(z.string().uuid(), { path: [] })).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
		);
	});

	test('creates object with string property of length', () => {
		const schema = z.object({
			lastFour: z.string().length(4),
		});
		const fixture = core.generate(schema, { path: [] }) as z.infer<
			typeof schema
		>;
		expect(fixture.lastFour).toHaveLength(4);
	});

	test('creates a string that is a cuid', () => {
		const schema = z.string().cuid();
		const value = core.generate(schema, { path: [] }) as string;
		expect(isCuid(value)).toBeTruthy();
	});

	test('creates a string that is a cuid2', () => {
		expect(
			isCuid2(core.generate(z.string().cuid2(), { path: [] }) as string),
		).toBeTruthy();
	});

	test('creates a string that is an email', () => {
		const email = core.generate(z.string().email(), { path: [] });
		expect(email).include('@');
		expect(email).include('.');
	});

	test('creates a string that startsWith', () => {
		const value = core.generate(z.string().startsWith('start_'), {
			path: [],
		}) as string;
		expect(value.startsWith('start_')).toBeTruthy();
	});

	test('creates a string that endsWith', () => {
		const value = core.generate(z.string().endsWith('_end'), {
			path: [],
		}) as string;
		expect(value.endsWith('_end')).toBeTruthy();
	});

	test('creates a string that startsWith and endsWith', () => {
		const value = core.generate(
			z.string().startsWith('start_').endsWith('_end'),
			{ path: [] },
		) as string;
		expect(value.startsWith('start_')).toBeTruthy();
		expect(value.endsWith('_end')).toBeTruthy();
	});

	test('creates a nullable string', () => {
		expect(core.generate(z.string().nullable(), { path: [] })).toBeTypeOf(
			'string',
		);
		expect(core.generate(z.string().nullish(), { path: [] })).toBeTypeOf(
			'string',
		);
		expect(core.generate(z.string().optional(), { path: [] })).toBeTypeOf(
			'string',
		);
	});
});
