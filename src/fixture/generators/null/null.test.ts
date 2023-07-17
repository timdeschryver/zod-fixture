import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NullGenerator } from '.';

describe('create empty types', () => {
	const transform = new ConstrainedTransformer().extend([NullGenerator]);

	test('produces a valid null', () => {
		expect(transform).toReasonablySatisfy(z.null());
	});

	test('creates a null', () => {
		expect(transform.fromSchema(z.null())).toBeNull();
	});
});
