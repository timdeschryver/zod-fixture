import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { OptionalGenerator } from '.';
import { BooleanGenerator } from '../boolean';
import { DateGenerator } from '../date';
import { NullableGenerator } from '../nullable';
import { NumberGenerator } from '../number';
import { ObjectGenerator } from '../object';
import { StringGenerator } from '../string';

describe('create empty types', () => {
	const core = new Core().register([
		OptionalGenerator,
		StringGenerator,
		NullableGenerator,
		BooleanGenerator,
		NumberGenerator,
		ObjectGenerator,
        DateGenerator
	]);

	test('creates a nullable string', () => {
		expect(core.generate(z.string().nullish(), { path: [] })).toBeTypeOf('string');
		expect(core.generate(z.string().optional(), { path: [] })).toBeTypeOf('string');
	});

	test('creates a nullable boolean', () => {
		expect(core.generate(z.boolean().nullish(), { path: [] })).toBeTypeOf('boolean');
		expect(core.generate(z.boolean().optional(), { path: [] })).toBeTypeOf('boolean');
	});

	test('creates a nullable number', () => {
		expect(core.generate(z.number().nullish(), { path: [] })).toBeTypeOf('number');
		expect(core.generate(z.number().optional(), { path: [] })).toBeTypeOf('number');
	});

	test('creates a nullable empty object', () => {
		expect(core.generate(z.object({}).optional(), { path: [] })).toBeTypeOf('object');
		expect(core.generate(z.object({}).nullish(), { path: [] })).toBeTypeOf('object');
	});

	test('creates object with optional value ', () => {
		const SampleWithOptionalValueSchema = z.object({
			name: z.string().optional(),
			modify: z.number().optional(),
		});
		expect(() => {
			core.generate(SampleWithOptionalValueSchema, { path: [] });
		}).not.toThrow();
	});

	test('creates a nullable date', () => {
		expect(core.generate(z.date().nullish(), { path: [] })).toBeInstanceOf(Date);
		expect(core.generate(z.date().optional(), { path: [] })).toBeInstanceOf(Date);
	});
});
