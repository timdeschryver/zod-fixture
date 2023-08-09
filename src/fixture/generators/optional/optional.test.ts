import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { OptionalGenerator } from '.';
import { BooleanGenerator } from '../boolean';
import { NullableGenerator } from '../nullable';
import { ObjectGenerator } from '../object';
import { StringGenerator } from '../string';

describe('create empty types', () => {
	const transform = new ConstrainedTransformer().extend([
		OptionalGenerator,
		StringGenerator,
		NullableGenerator,
		BooleanGenerator,
		ObjectGenerator,
	]);

	test('produces a valid nullish', () => {
		expect(transform).toReasonablySatisfy(z.string().nullish());
	});

	test('produces a valid optional', () => {
		expect(transform).toReasonablySatisfy(z.string().optional());
	});

	test('creates a nullish string', () => {
		const schema = z.string().nullish();

		const nullish1 = transform.fromSchema(schema, { seed: 1 });
		const nullish2 = transform.fromSchema(schema, { seed: 2 });
		const nullish3 = transform.fromSchema(schema, { seed: 3 });

		expect(nullish1).toBe(null);
		expect(nullish2).toBeTypeOf('string');
		expect(nullish3).toBe(undefined);
	});

	test('creates an optional string', () => {
		const schema = z.string().optional();

		const optional1 = transform.fromSchema(schema, { seed: 1 });
		const optional3 = transform.fromSchema(schema, { seed: 3 });

		expect(optional1).toBeTypeOf('string');
		expect(optional3).toBe(undefined);
	});

	test('creates a nullish boolean', () => {
		const schema = z.boolean().nullish();

		const nullish1 = transform.fromSchema(schema, { seed: 1 });
		const nullish2 = transform.fromSchema(schema, { seed: 2 });
		const nullish3 = transform.fromSchema(schema, { seed: 3 });
		const nullish5 = transform.fromSchema(schema, { seed: 5 });

		expect(nullish1).toBe(null);
		expect(nullish2).toBe(true);
		expect(nullish3).toBe(undefined);
		expect(nullish5).toBe(false);
	});

	test('creates an optional boolean', () => {
		const schema = z.boolean().optional();

		const optional1 = transform.fromSchema(schema, { seed: 1 });
		const optional2 = transform.fromSchema(schema, { seed: 2 });
		const optional3 = transform.fromSchema(schema, { seed: 3 });

		expect(optional1).toBe(false);
		expect(optional2).toBe(true);
		expect(optional3).toBe(undefined);
	});

	test('creates object with optional value ', () => {
		const SampleWithOptionalValueSchema = z.object({
			name: z.string().optional(),
			modify: z.boolean().optional(),
		});
		expect(() => {
			transform.fromSchema(SampleWithOptionalValueSchema);
		}).not.toThrow();
	});
});
