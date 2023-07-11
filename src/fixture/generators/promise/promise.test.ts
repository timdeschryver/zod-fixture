import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { PromiseGenerator } from '.';
import { NumberGenerator } from '../number';

describe('create a promise type', () => {
	const transform = new Transformer().extend([
		PromiseGenerator,
		NumberGenerator,
	]);

	test('produces a valid promoise', () => {
		expect(transform).toReasonablySatisfy(z.promise(z.number()));
	});

	test('creates a promise with the correct type', () => {
		expect(transform.fromSchema(z.promise(z.number()))).resolves.toBeTypeOf(
			'number'
		);
	});
});
