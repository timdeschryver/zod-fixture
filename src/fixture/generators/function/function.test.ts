import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { FunctionGenerator } from '.';

describe('create Functions', () => {
	const transform = new ConstrainedTransformer().extend([FunctionGenerator]);

	test('produces a valid function', () => {
		expect(transform).toReasonablySatisfy(z.function());
	});

	test('creates a function', () => {
		expect(transform.fromSchema(z.function())).toBeTypeOf('function');
	});
});
