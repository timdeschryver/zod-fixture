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
		expect(transform.fromSchema(z.string().nullable())).toBeTypeOf('string');
	});
});
