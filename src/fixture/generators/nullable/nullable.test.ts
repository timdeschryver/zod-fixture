import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NullableGenerator } from '.';
import { StringGenerator } from '../string';

describe('create empty types', () => {
	const transform = new Transformer().extend([
		NullableGenerator,
		StringGenerator,
	]);

	test('produces a valid nullable', () => {
		expect(transform).toReasonablySatisfy(z.string().nullable());
	});

	test('creates a nullable string', () => {
		expect(transform.from(z.string().nullable())).toBeTypeOf('string');
	});
});
