import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { ArrayGenerator } from '.';
import { NumberGenerator } from '../number';
import { StringGenerator } from '../string';

describe('create Arrays', () => {
	const transform = new Transformer().extend([
		ArrayGenerator,
		StringGenerator,
		NumberGenerator,
	]);

	test('produces a valid array', () => {
		expect(transform).toReasonablySatisfy(z.array(z.number()));
	});

	test('creates an array with the length of 3', () => {
		expect(transform.fromSchema(z.array(z.string()))).toHaveLength(3);
		expect(transform.fromSchema(z.number().array())).toHaveLength(3);
	});

	test('throws when min is greater than max', () => {
		expect(() =>
			transform.fromSchema(z.array(z.string()).min(10).max(5))
		).toThrowError();
	});
});
