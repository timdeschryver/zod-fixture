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
	const transform = new Transformer().extend([
		OptionalGenerator,
		StringGenerator,
		NullableGenerator,
		BooleanGenerator,
		NumberGenerator,
		ObjectGenerator,
		DateGenerator,
	]);

	test('produces a valid nullish', () => {
		expect(transform).toReasonablySatisfy(z.string().nullish());
	});

	test('produces a valid optional', () => {
		expect(transform).toReasonablySatisfy(z.number().optional());
	});

	test('creates a nullable string', () => {
		expect(transform.from(z.string().nullish())).toBeTypeOf('string');
		expect(transform.from(z.string().optional())).toBeTypeOf('string');
	});

	test('creates a nullable boolean', () => {
		expect(transform.from(z.boolean().nullish())).toBeTypeOf('boolean');
		expect(transform.from(z.boolean().optional())).toBeTypeOf('boolean');
	});

	test('creates a nullable number', () => {
		expect(transform.from(z.number().nullish())).toBeTypeOf('number');
		expect(transform.from(z.number().optional())).toBeTypeOf('number');
	});

	test('creates a nullable empty object', () => {
		expect(transform.from(z.object({}).optional())).toBeTypeOf('object');
		expect(transform.from(z.object({}).nullish())).toBeTypeOf('object');
	});

	test('creates object with optional value ', () => {
		const SampleWithOptionalValueSchema = z.object({
			name: z.string().optional(),
			modify: z.number().optional(),
		});
		expect(() => {
			transform.from(SampleWithOptionalValueSchema);
		}).not.toThrow();
	});

	test('creates a nullable date', () => {
		expect(transform.from(z.date().nullish())).toBeInstanceOf(Date);
		expect(transform.from(z.date().optional())).toBeInstanceOf(Date);
	});
});
