import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { AnyGenerator } from '.';
import { NumberGenerator } from '../number';

describe('create any', () => {
	test('produces an any', () => {
		const core = new Transformer().extend([AnyGenerator]);
		expect(core).toProduce(z.any());
	});

	test('creates a value for the registered generator', () => {
		const core = new Transformer().extend([AnyGenerator, NumberGenerator]);
		const schema = z.any();
		expect(core).toProduce(schema);
		expect(core.from(schema)).toBeTypeOf('number');
	});
});
