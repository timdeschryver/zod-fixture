import { Core } from '@/core/core';
import { isCuid as isCuid2 } from '@paralleldrive/cuid2';
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
		expect(
			(core.generate(z.string().max(2)) as string)?.length,
		).toBeLessThanOrEqual(2);
	});

	test('throws when min is greater than max', () => {
		expect(() =>
			core.generate(z.string().min(50).max(40)),
		).toThrowError();
	});

	test('throws when min is negative', () => {
		expect(() =>
			core.generate(z.string().min(-1)),
		).toThrowError();
	});

	test('creates a string that is a uuid', () => {
		expect(core.generate(z.string().uuid())).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
		);
	});

	test('creates object with string property of length', () => {
		const schema = z.object({
			lastFour: z.string().length(4),
		});
		const fixture = core.generate(schema) as z.infer<
			typeof schema
		>;
		expect(fixture.lastFour).toHaveLength(4);
	});

	test('creates a string that is a cuid2', () => {
		expect(
			isCuid2(core.generate(z.string().cuid2()) as string),
		).toBeTruthy();
	});

	test('creates a string that is an email', () => {
		const email = core.generate(z.string().email());
		expect(email).include('@');
		expect(email).include('.');
	});

	test('creates a string that startsWith', () => {
		const value = core.generate(z.string().startsWith('start_')) as string;
		expect(value.startsWith('start_')).toBeTruthy();
	});

	test('creates a string that endsWith', () => {
		const value = core.generate(z.string().endsWith('_end')) as string;
		expect(value.endsWith('_end')).toBeTruthy();
	});

	test('creates a string that startsWith and endsWith', () => {
		const value = core.generate(
			z.string().startsWith('start_').endsWith('_end'),
		) as string;
		expect(value.startsWith('start_')).toBeTruthy();
		expect(value.endsWith('_end')).toBeTruthy();
	});

	test('creates a nullable string', () => {
		expect(core.generate(z.string().nullable())).toBeTypeOf(
			'string',
		);
		expect(core.generate(z.string().nullish())).toBeTypeOf(
			'string',
		);
		expect(core.generate(z.string().optional())).toBeTypeOf(
			'string',
		);
	});
});
