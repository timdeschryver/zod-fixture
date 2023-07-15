import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NanGenerator } from '.';

describe('create NaNs', () => {
	const transform = new ConstrainedTransformer().extend([NanGenerator]);

	test('produces a valid NaN', () => {
		expect(transform).toReasonablySatisfy(z.nan());
	});

	test('creates a NaN', () => {
		expect(Number.isNaN(transform.fromSchema(z.nan()))).toBeTruthy();
	});
});
