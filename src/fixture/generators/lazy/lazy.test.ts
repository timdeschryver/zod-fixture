import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { LazyGenerator } from '.';
import { NumberGenerator } from '../number';

describe('create a lazy type', () => {
	const core = new Transformer().extend([LazyGenerator, NumberGenerator]);

	test('produces a valid lazy', () => {
		expect(core).toProduce(z.lazy(() => z.number()));
	});

	test('creates a promise with the correct type', () => {
		expect(core.from(z.lazy(() => z.number()))).toBeTypeOf('number');
	});
});
