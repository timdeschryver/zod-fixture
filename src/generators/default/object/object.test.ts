import { Core } from '@/core/core';
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
	const core = new Core().register([
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

	test('creates an empty object', () => {
		expect(core.generate(z.object({}))).toBeTypeOf('object');
	});

	test('creates an object', () => {
		const input = z.object({
			str: z.string(),
			num: z.number(),
		});

		const result = core.generate(input);

		expect(result).toBeTypeOf('object');
		expect(result.str).toBeTypeOf('string');
		expect(result.num).toBeTypeOf('number');
	});

	test('creates a nested object', () => {
		const input = z.object({
			str: z.string(),
			nested: z.object({
				num: z.number(),
				str: z.string(),
			}),
		});

		const result = core.generate(input);
		expect(result).toBeTypeOf('object');
		expect(result.str).toBeTypeOf('string');
		expect(result.nested.num).toBeTypeOf('number');
	});

	test("creates an object with zod's api", () => {
		const BaseTeacher = z.object({ name: z.string() });
		const HasID = z.object({ id: z.string() });
		const Teacher = BaseTeacher.merge(HasID);

		const result = core.generate(Teacher);
		expect(result).toBeTypeOf('object');
		expect(result.id).toBeTypeOf('string');
		expect(result.name).toBeTypeOf('string');
	});

	test('creates an object with additional keys for passthrough', () => {
		const input = z
			.object({
				str: z.string(),
				num: z.number(),
			})
			.passthrough();

		const result = core.generate(input);

		expect(result).toBeTypeOf('object');
		expect(result.str).toBeTypeOf('string');
		expect(result.num).toBeTypeOf('number');
		expect(Object.keys(result).length).toBeGreaterThan(2);
	});
});

describe('create Records', () => {
	const core = new Core().register([
		RecordGenerator,
		StringGenerator,
		NumberGenerator,
	]);

	test('creates a record with 3 entries', () => {
		const input = z.record(z.number());
		const result = core.generate(input);

		expect(Object.keys(result)).toHaveLength(3);
		expect(Object.keys(result)[0]).toBeTypeOf('string');
		expect(Object.values(result)[0]).toBeTypeOf('number');
	});

	test('creates a record with a defined key type', () => {
		const input = z.record(z.string(), z.string());
		const result = core.generate(input);

		expect(Object.keys(result)[0]).toBeTypeOf('string');
		expect(Object.values(result)[0]).toBeTypeOf('string');
	});
});
