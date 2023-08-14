import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { ReadonlyGenerator } from '.';
import { ArrayGenerator } from '../array';
import { ObjectGenerator } from '../object';
import { StringGenerator } from '../string';

describe('create readonly type', () => {
	const transform = new ConstrainedTransformer().extend([
		ReadonlyGenerator,
		ArrayGenerator,
		ObjectGenerator,
		StringGenerator,
	]);

	test('creates a readonly array', () => {
		const schema = z.string().array();
		const readonly = schema.readonly();
		const result = transform.fromSchema(readonly) as z.infer<typeof schema>;

		expect(() => result.push('test')).toThrow();
		expect(() => {
			result[0] = 'skjdfkjd';
		}).toThrow();
	});

	test('creates a readonly object', () => {
		const schema = z.object({
			test: z.string(),
		});
		const readonly = schema.readonly();
		const result = transform.fromSchema(readonly) as z.infer<typeof schema>;

		expect(() => {
			result.test = 'skjdfkjd';
		}).toThrow();
	});
});
