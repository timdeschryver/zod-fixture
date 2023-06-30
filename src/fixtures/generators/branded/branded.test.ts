import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { BrandedGenerator } from '.';
import { NumberGenerator } from '../number';

describe('create a branded type', () => {
	const core = new Transformer().extend([BrandedGenerator, NumberGenerator]);

	test('produces a valid brand', () => {
		expect(core).toProduce(z.number().brand('brand'));
	});

	test('creates a brand with the correct type', () => {
		expect(core.from(z.number().brand('test'))).toBeTypeOf('number');
	});
});
