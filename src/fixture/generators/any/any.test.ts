import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { AnyGenerator } from '.';
import { NumberGenerator } from '../number';

describe('create any', () => {
	test('produces an any', () => {
		const transform = new Transformer().extend([AnyGenerator]);
		expect(transform).toProduce(z.any());
	});

	test('creates a value for the registered generator', () => {
		const transform = new Transformer().extend([AnyGenerator, NumberGenerator]);
		const schema = z.any();
		expect(transform).toProduce(schema);
		expect(transform.from(schema)).toBeTypeOf('number');
	});
});
