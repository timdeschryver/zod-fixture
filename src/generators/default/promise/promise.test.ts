import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { PromiseGenerator } from '.';
import { NumberGenerator } from '../number';

describe('create a promise type', () => {
	const core = new Core().register([PromiseGenerator, NumberGenerator]);

	test('produces a valid promoise', () => {
		expect(core).toProduce(z.promise(z.number()));
	});

	test('creates a promise with the correct type', () => {
		expect(core.generate(z.promise(z.number()))).resolves.toBeTypeOf('number');
	});
});
