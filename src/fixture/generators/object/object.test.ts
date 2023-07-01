import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { ObjectGenerator, RecordGenerator } from '.';
import { AnyGenerator } from '../any';
import { ArrayGenerator } from '../array';
import { BigIntGenerator } from '../bigint';
import { BooleanGenerator } from '../boolean';
import { DateGenerator } from '../date';
import { MapGenerator } from '../map';
import { NanGenerator } from '../nan';
import { NullGenerator } from '../null';
import { NumberGenerator } from '../number';
import { PromiseGenerator } from '../promise';
import { SetGenerator } from '../set';
import { StringGenerator } from '../string';
import { SymbolGenerator } from '../symbol';
import { UndefinedGenerator } from '../undefined';

describe('create objects', () => {
	const transform = new Transformer().extend([
		ObjectGenerator,
		StringGenerator,
		NumberGenerator,
		AnyGenerator,
		UndefinedGenerator,
		NullGenerator,
		BooleanGenerator,
		BigIntGenerator,
		DateGenerator,
		SymbolGenerator,
		NanGenerator,
		ArrayGenerator,
		MapGenerator,
		SetGenerator,
		PromiseGenerator,
		RecordGenerator,
	]);

	test('produces a valid empty object', () => {
		expect(transform).toReasonablySatisfy(z.object({}));
	});

	test('creates an empty object', () => {
		expect(transform.from(z.object({}))).toBeTypeOf('object');
	});

	test('produces a valid object', () => {
		expect(transform).toReasonablySatisfy(
			z.object({
				str: z.string(),
				num: z.number(),
			})
		);
	});

	test('creates an object', () => {
		const input = z.object({
			str: z.string(),
			num: z.number(),
		});

		type I = z.infer<typeof input>;

		const result = transform.from(input);

		expect(result).toBeTypeOf('object');
		expect((result as I).str).toBeTypeOf('string');
		expect((result as I).num).toBeTypeOf('number');
	});

	test('produces a valid nested object', () => {
		expect(transform).toReasonablySatisfy(
			z.object({
				str: z.string(),
				nested: z.object({
					num: z.number(),
					str: z.string(),
				}),
			})
		);
	});

	test('creates a nested object', () => {
		const input = z.object({
			str: z.string(),
			nested: z.object({
				num: z.number(),
				str: z.string(),
			}),
		});

		type I = z.infer<typeof input>;

		const result = transform.from(input);
		expect(result).toBeTypeOf('object');
		expect((result as I).str).toBeTypeOf('string');
		expect((result as I).nested.num).toBeTypeOf('number');
	});

	test("creates an object with zod's api", () => {
		const BaseTeacher = z.object({ name: z.string() });
		const HasID = z.object({ id: z.string() });
		const Teacher = BaseTeacher.merge(HasID);

		type BaseTeacher = z.infer<typeof BaseTeacher>;
		type HasID = z.infer<typeof HasID>;

		const result = transform.from(Teacher);
		expect(result).toBeTypeOf('object');
		expect((result as HasID).id).toBeTypeOf('string');
		expect((result as BaseTeacher).name).toBeTypeOf('string');
	});

	test('creates an object with additional keys for passthrough', () => {
		const input = z
			.object({
				str: z.string(),
				num: z.number(),
			})
			.passthrough();

		type I = z.infer<typeof input>;

		const result = transform.from(input);

		expect(result).toBeTypeOf('object');
		expect((result as I).str).toBeTypeOf('string');
		expect((result as I).num).toBeTypeOf('number');
		expect(Object.keys(result as I).length).toBeGreaterThan(2);
	});
});

describe('create Records', () => {
	const transform = new Transformer().extend([
		RecordGenerator,
		StringGenerator,
		NumberGenerator,
	]);

	test('produces a valid record', () => {
		expect(transform).toReasonablySatisfy(z.record(z.number()));
	});

	test('creates a record with 3 entries', () => {
		const input = z.record(z.number());
		const result = transform.from(input);

		type I = z.infer<typeof input>;

		expect(Object.keys(result as I)).toHaveLength(3);
		expect(Object.keys(result as I)[0]).toBeTypeOf('string');
		expect(Object.values(result as I)[0]).toBeTypeOf('number');
	});

	test('creates a record with a defined key type', () => {
		const input = z.record(z.string(), z.string());
		const result = transform.from(input);

		type I = z.infer<typeof input>;

		expect(Object.keys(result as I)[0]).toBeTypeOf('string');
		expect(Object.values(result as I)[0]).toBeTypeOf('string');
	});
});
