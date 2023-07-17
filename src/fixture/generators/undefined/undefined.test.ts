import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { UndefinedGenerator } from '.';

describe('create empty types', () => {
	const transform = new ConstrainedTransformer().extend([UndefinedGenerator]);

	test('produces a valid undefined', () => {
		expect(transform).toReasonablySatisfy(z.undefined());
	});

	test('creates an undefined', () => {
		expect(transform.fromSchema(z.undefined())).toBeUndefined();
	});
});
