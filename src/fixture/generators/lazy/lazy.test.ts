import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { LazyGenerator } from '.';
import { NumberGenerator } from '../number';

describe('create a lazy type', () => {
	const transform = new ConstrainedTransformer().extend([
		LazyGenerator,
		NumberGenerator,
	]);

	test('produces a valid lazy', () => {
		expect(transform).toReasonablySatisfy(z.lazy(() => z.number()));
	});

	test('creates a promise with the correct type', () => {
		expect(transform.fromSchema(z.lazy(() => z.number()))).toBeTypeOf('number');
	});
});
