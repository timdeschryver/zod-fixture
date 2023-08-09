import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NullableGenerator } from '.';
import { StringGenerator } from '../string';

describe('create empty types', () => {
	const transform = new ConstrainedTransformer().extend([
		NullableGenerator,
		StringGenerator,
	]);

	test('produces a valid nullable', () => {
		expect(transform).toReasonablySatisfy(z.string().nullable());
	});

	test('creates a nullable string', () => {
		const schema = z.string().nullable();

		expect(transform.fromSchema(schema, { seed: 1 })).toBeTypeOf('string');
		expect(transform.fromSchema(schema, { seed: 3 })).toBe(null);
	});
});
