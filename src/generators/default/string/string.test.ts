import { Core } from '@/core/core';
import { isCuid as isCuid2 } from '@paralleldrive/cuid2';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import {
	Cuid2Generator,
	CuidGenerator,
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
		CuidGenerator,
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
		expect(core.generate(z.string().min(100)).length).toBeGreaterThanOrEqual(
			100
		);
	});

	test('creates a string with a max length', () => {
		expect(core.generate(z.string().max(2))?.length).toBeLessThanOrEqual(2);
	});

	test('throws when min is greater than max', () => {
		expect(() => core.generate(z.string().min(50).max(40))).toThrowError();
	});

	test('throws when min is negative', () => {
		expect(() => core.generate(z.string().min(-1))).toThrowError();
	});

	test('creates a string that is a uuid', () => {
		expect(core.generate(z.string().uuid())).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
		);
	});

	test('creates object with string property of length', () => {
		const schema = z.object({
			lastFour: z.string().length(4),
		});
		const fixture = core.generate(schema) as z.infer<typeof schema>;
		expect(fixture.lastFour).toHaveLength(4);
	});

	test('cuid throws an error', () => {
		expect(() => core.generate(z.string().cuid())).toThrowError();
	});

	test('creates a string that is a cuid2', () => {
		expect(isCuid2(core.generate(z.string().cuid2()))).toBeTruthy();
	});

	test('creates a string that is an email', () => {
		const email = core.generate(z.string().email());
		expect(email).include('@');
		expect(email).include('.');
	});

	test('creates a string is lowercase', () => {
		const lowercase = core.generate(z.string().toLowerCase());
		expect(lowercase).toMatch(/^[^A-Z]*$/);
	});

	test('creates a string is uppercase', () => {
		const uppercase = core.generate(z.string().toUpperCase());
		expect(uppercase).toMatch(/^[^a-z]*$/);
	});

	test('creates a string that startsWith', () => {
		const value = core.generate(z.string().startsWith('start_'));
		expect(value.startsWith('start_')).toBeTruthy();
	});

	test('creates a string that endsWith', () => {
		const value = core.generate(z.string().endsWith('_end'));
		expect(value.endsWith('_end')).toBeTruthy();
	});

	test('creates a string that startsWith and endsWith', () => {
		const value = core.generate(
			z.string().startsWith('start_').endsWith('_end')
		);
		expect(value.startsWith('start_')).toBeTruthy();
		expect(value.endsWith('_end')).toBeTruthy();
	});

	test('creates a string that is an URL', () => {
		const url = core.generate(z.string().url());
		expect(url).toMatch(
			/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/
		);
	});

	test('creates a small string using length', () => {
		const value = core.generate(z.string().length(2));
		expect(value).toHaveLength(2);
	});

	test('creates a large string using length', () => {
		const value = core.generate(z.string().length(6000));
		expect(value).toHaveLength(6000);
	});

	test('creates a large string using length with startsWith and EndsWith', () => {
		const value = core.generate(
			z.string().length(6000).startsWith('start_').endsWith('_end')
		);
		expect(value).toHaveLength(6000);
		expect(value.startsWith('start_')).toBeTruthy();
		expect(value.endsWith('_end')).toBeTruthy();
	});

	test('creates a large string using min and max', () => {
		const value = core.generate(
			z.string().min(6000).max(7000).startsWith('start_').endsWith('_end')
		);
		expect(value.length).toBeGreaterThan(6000);
		expect(value.length).toBeLessThan(7000);
		expect(value.startsWith('start_')).toBeTruthy();
		expect(value.endsWith('_end')).toBeTruthy();
	});

	test('creates a nullable string', () => {
		expect(core.generate(z.string().nullable())).toBeTypeOf('string');
		expect(core.generate(z.string().nullish())).toBeTypeOf('string');
		expect(core.generate(z.string().optional())).toBeTypeOf('string');
	});
});
