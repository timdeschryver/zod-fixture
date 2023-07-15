import { ConstrainedTransformer } from '@/transformer/transformer';
import { isCuid as isCuid2 } from '@paralleldrive/cuid2';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import {
	Cuid2Generator,
	CuidGenerator,
	DateTimeGenerator,
	EmailGenerator,
	StringGenerator,
	UrlGenerator,
	UuidGenerator,
} from '.';
import { NullableGenerator } from '../nullable';
import { ObjectGenerator } from '../object';
import { OptionalGenerator } from '../optional';

describe('create strings', () => {
	const transform = new ConstrainedTransformer().extend([
		UuidGenerator,
		CuidGenerator,
		Cuid2Generator,
		UrlGenerator,
		EmailGenerator,
		DateTimeGenerator,
		StringGenerator,
		NullableGenerator,
		OptionalGenerator,
		ObjectGenerator,
	]);

	test('produces a valid string', () => {
		expect(transform).toReasonablySatisfy(z.string());
	});

	test('creates a string', () => {
		expect(transform.fromSchema(z.string())).toBeTypeOf('string');
	});

	test('produces a valid string with length', () => {
		expect(transform).toReasonablySatisfy(z.string().length(60));
	});

	test('creates a string with a fixed length', () => {
		expect(transform.fromSchema(z.string().length(5))).toHaveLength(5);
	});

	test('produces a valid string with min and max', () => {
		expect(transform).toReasonablySatisfy(z.string().min(3).max(9));
	});

	test('creates a string with a min length', () => {
		expect(
			(transform.fromSchema(z.string().min(100)) as string).length
		).toBeGreaterThanOrEqual(100);
	});

	test('creates a string with a max length', () => {
		expect(
			(transform.fromSchema(z.string().max(2)) as string).length
		).toBeLessThanOrEqual(2);
	});

	test('throws when min is greater than max', () => {
		expect(() =>
			transform.fromSchema(z.string().min(50).max(40))
		).toThrowError();
	});

	test('throws when min is negative', () => {
		expect(() => transform.fromSchema(z.string().min(-1))).toThrowError();
	});

	test('produces a valid string that is a uuid', () => {
		expect(transform).toReasonablySatisfy(z.string().uuid());
	});

	test('creates a string that is a uuid', () => {
		expect(transform.fromSchema(z.string().uuid())).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
		);
	});

	test('creates object with string property of length', () => {
		const schema = z.object({
			lastFour: z.string().length(4),
		});
		const fixture = transform.fromSchema(schema) as z.infer<typeof schema>;
		expect(fixture.lastFour).toHaveLength(4);
	});

	test('cuid throws an error', () => {
		expect(() => transform.fromSchema(z.string().cuid())).toThrowError();
	});

	test('produces a valid string that is a cuid2', () => {
		expect(transform).toReasonablySatisfy(z.string().cuid2());
	});

	test('creates a string that is a cuid2', () => {
		expect(
			isCuid2(transform.fromSchema(z.string().cuid2()) as string)
		).toBeTruthy();
	});

	test('produces a valid string that is a email', () => {
		expect(transform).toReasonablySatisfy(z.string().email());
	});

	test('creates a string that is an email', () => {
		const email = transform.fromSchema(z.string().email());
		expect(email).include('@');
		expect(email).include('.');
	});

	test('produces a valid string that is a lowercase', () => {
		expect(transform).toReasonablySatisfy(z.string().toLowerCase());
	});

	test('creates a string is lowercase', () => {
		const lowercase = transform.fromSchema(z.string().toLowerCase());
		expect(lowercase).toMatch(/^[^A-Z]*$/);
	});

	test('produces a valid string that is a uppercase', () => {
		expect(transform).toReasonablySatisfy(z.string().toUpperCase());
	});

	test('creates a string is uppercase', () => {
		const uppercase = transform.fromSchema(z.string().toUpperCase());
		expect(uppercase).toMatch(/^[^a-z]*$/);
	});

	test('produces a valid string with a start and end', () => {
		expect(transform).toReasonablySatisfy(
			z.string().startsWith('begin').endsWith('end')
		);
	});

	test('creates a string that startsWith', () => {
		const value = transform.fromSchema(
			z.string().startsWith('start_')
		) as string;
		expect(value.startsWith('start_')).toBeTruthy();
	});

	test('creates a string that endsWith', () => {
		const value = transform.fromSchema(z.string().endsWith('_end')) as string;
		expect(value.endsWith('_end')).toBeTruthy();
	});

	test('creates a string that startsWith and endsWith', () => {
		const value = transform.fromSchema(
			z.string().startsWith('start_').endsWith('_end')
		) as string;
		expect(value.startsWith('start_')).toBeTruthy();
		expect(value.endsWith('_end')).toBeTruthy();
	});

	test('produces a valid string that is a url', () => {
		expect(transform).toReasonablySatisfy(z.string().url());
	});

	test('creates a string that is an URL', () => {
		const url = transform.fromSchema(z.string().url());
		expect(url).toMatch(
			/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/
		);
	});

	test('creates a small string using length', () => {
		const value = transform.fromSchema(z.string().length(2));
		expect(value).toHaveLength(2);
	});

	test('creates a large string using length', () => {
		const value = transform.fromSchema(z.string().length(6000));
		expect(value).toHaveLength(6000);
	});

	test('creates a string with endsWith', () => {
		const value = transform.fromSchema(
			z.string().startsWith('foxy').includes('mama')
		) as string;
		expect(value.startsWith('foxy')).toBeTruthy();
		expect(value.includes('mama')).toBeTruthy();
	});

	test('correctly trims string', () => {
		const value = transform.fromSchema(z.string().endsWith('     ').trim());
		expect(value).toHaveLength(10);
	});

	test('correctly creates an emoji string', () => {
		expect(transform).toReasonablySatisfy(z.string().emoji());
	});

	test('creates a large string using length with startsWith and endsWith', () => {
		const value = transform.fromSchema(
			z.string().length(6000).startsWith('start_').endsWith('_end')
		) as string;
		expect(value).toHaveLength(6000);
		expect(value.startsWith('start_')).toBeTruthy();
		expect(value.endsWith('_end')).toBeTruthy();
	});

	test('creates a large string using min and max', () => {
		const value = transform.fromSchema(
			z.string().min(6000).max(7000).startsWith('start_').endsWith('_end')
		) as string;
		expect(value.length).toBeGreaterThanOrEqual(6000);
		expect(value.length).toBeLessThanOrEqual(7000);
		expect(value.startsWith('start_')).toBeTruthy();
		expect(value.endsWith('_end')).toBeTruthy();
	});

	test('creates a nullable string', () => {
		expect(transform.fromSchema(z.string().nullable())).toBeTypeOf('string');
		expect(transform.fromSchema(z.string().nullish())).toBeTypeOf('string');
		expect(transform.fromSchema(z.string().optional())).toBeTypeOf('string');
	});

	test('produces a valid string that is a datetime', () => {
		expect(transform).toReasonablySatisfy(z.string().datetime());
	});

	test('produces a valid string that is a datetime', () => {
		expect(transform.fromSchema(z.string().datetime())).toBeTypeOf('string');
		expect(
			new Date(transform.fromSchema(z.string().datetime()) as string)
		).toBeInstanceOf(Date);
	});
});
