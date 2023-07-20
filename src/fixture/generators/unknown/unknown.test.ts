import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { UnknownGenerator } from '.';

describe('create unknown', () => {
	test('produces an unknown', () => {
		const transform = new ConstrainedTransformer().extend([UnknownGenerator]);
		expect(transform).toReasonablySatisfy(z.unknown());
	});

	test('creates a value for the registered generator', () => {
		const transform = new ConstrainedTransformer().extend([UnknownGenerator]);
		const schema = z.unknown();
		expect(transform).toReasonablySatisfy(schema);
		expect(transform.fromSchema(schema)).toBeTypeOf('string');
	});
});
