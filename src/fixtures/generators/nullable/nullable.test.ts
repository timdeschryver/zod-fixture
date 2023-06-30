import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NullableGenerator } from '.';
import { StringGenerator } from '../string';

describe('create empty types', () => {
	const core = new Transformer().extend([NullableGenerator, StringGenerator]);

	test('produces a valid nullable', () => {
		expect(core).toProduce(z.string().nullable());
	});

	test('creates a nullable string', () => {
		expect(core.generate(z.string().nullable())).toBeTypeOf('string');
	});
});
