import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { PromiseGenerator } from '.';
import { NumberGenerator } from '../number';

describe('create a promise type', () => {
	const core = new Transformer().extend([PromiseGenerator, NumberGenerator]);

	test('produces a valid promoise', () => {
		expect(core).toProduce(z.promise(z.number()));
	});

	test('creates a promise with the correct type', () => {
		expect(core.from(z.promise(z.number()))).resolves.toBeTypeOf('number');
	});
});
