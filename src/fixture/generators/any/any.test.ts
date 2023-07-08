import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { AnyGenerator } from '.';

describe('create any', () => {
	test('produces an any', () => {
		const transform = new Transformer().extend([AnyGenerator]);
		expect(transform).toReasonablySatisfy(z.any());
	});

	test('creates a value for the registered generator', () => {
		const transform = new Transformer().extend([AnyGenerator]);
		const schema = z.any();
		expect(transform).toReasonablySatisfy(schema);
		expect(transform.from(schema)).toBeTypeOf('string');
	});
});
