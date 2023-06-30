import { Transformer } from '@/transformer/transformer';
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
	const core = new Transformer().extend([
		OptionalGenerator,
		StringGenerator,
		NullableGenerator,
		BooleanGenerator,
		NumberGenerator,
		ObjectGenerator,
		DateGenerator,
	]);

	test('produces a valid nullish', () => {
		expect(core).toProduce(z.string().nullish());
	});

	test('produces a valid optional', () => {
		expect(core).toProduce(z.number().optional());
	});

	test('creates a nullable string', () => {
		expect(core.generate(z.string().nullish())).toBeTypeOf('string');
		expect(core.generate(z.string().optional())).toBeTypeOf('string');
	});

	test('creates a nullable boolean', () => {
		expect(core.generate(z.boolean().nullish())).toBeTypeOf('boolean');
		expect(core.generate(z.boolean().optional())).toBeTypeOf('boolean');
	});

	test('creates a nullable number', () => {
		expect(core.generate(z.number().nullish())).toBeTypeOf('number');
		expect(core.generate(z.number().optional())).toBeTypeOf('number');
	});

	test('creates a nullable empty object', () => {
		expect(core.generate(z.object({}).optional())).toBeTypeOf('object');
		expect(core.generate(z.object({}).nullish())).toBeTypeOf('object');
	});

	test('creates object with optional value ', () => {
		const SampleWithOptionalValueSchema = z.object({
			name: z.string().optional(),
			modify: z.number().optional(),
		});
		expect(() => {
			core.generate(SampleWithOptionalValueSchema);
		}).not.toThrow();
	});

	test('creates a nullable date', () => {
		expect(core.generate(z.date().nullish())).toBeInstanceOf(Date);
		expect(core.generate(z.date().optional())).toBeInstanceOf(Date);
	});
});
