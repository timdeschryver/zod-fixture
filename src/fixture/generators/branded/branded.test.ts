import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { BrandedGenerator } from '.';
import { NumberGenerator } from '../number';

describe('create a branded type', () => {
	const transform = new Transformer().extend([
		BrandedGenerator,
		NumberGenerator,
	]);

	test('produces a valid brand', () => {
		expect(transform).toReasonablySatisfy(z.number().brand('brand'));
	});

	test('creates a brand with the correct type', () => {
		expect(transform.from(z.number().brand('test'))).toBeTypeOf('number');
	});
});
