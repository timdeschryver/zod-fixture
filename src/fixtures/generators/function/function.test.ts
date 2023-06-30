import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { FunctionGenerator } from '.';

describe('create Functions', () => {
	const core = new Transformer().extend([FunctionGenerator]);

	test('produces a valid function', () => {
		expect(core).toProduce(z.function());
	});

	test('creates a function', () => {
		expect(core.from(z.function())).toBeTypeOf('function');
	});
});
