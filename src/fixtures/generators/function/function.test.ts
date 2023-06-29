import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { FunctionGenerator } from '.';

describe('create Functions', () => {
	const core = new Core().register([FunctionGenerator]);

	test('produces a valid function', () => {
		expect(core).toProduce(z.function());
	});

	test('creates a function', () => {
		expect(core.generate(z.function())).toBeTypeOf('function');
	});
});
