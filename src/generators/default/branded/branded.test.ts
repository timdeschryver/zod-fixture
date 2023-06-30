import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { BrandedGenerator } from '.';
import { NumberGenerator } from '../number';

describe('create a branded type', () => {
	const core = new Core().register([BrandedGenerator, NumberGenerator]);

	test('produces a valid brand', () => {
		expect(core).toReasonablySatisfy(z.number().brand('brand'));
	});

	test('creates a brand with the correct type', () => {
		expect(core.generate(z.number().brand('test'))).toBeTypeOf('number');
	});
});
