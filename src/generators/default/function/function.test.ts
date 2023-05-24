import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { FunctionGenerator } from '.';

describe('create Functions', () => {
	const core = new Core().register([FunctionGenerator]);

	test('creates a function', () => {
		expect(core.generate(z.function(), { path: [] })).toBeTypeOf('function');
	});
});
