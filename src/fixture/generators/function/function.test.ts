import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { FunctionGenerator } from '.';

describe('create Functions', () => {
	const transform = new Transformer().extend([FunctionGenerator]);

	test('produces a valid function', () => {
		expect(transform).toProduce(z.function());
	});

	test('creates a function', () => {
		expect(transform.from(z.function())).toBeTypeOf('function');
	});
});
