import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { TupleGenerator } from '.';
import { NumberGenerator } from '../number';
import { ObjectGenerator } from '../object';
import { StringGenerator } from '../string';

describe('create Tuples', () => {
	const transform = new ConstrainedTransformer().extend([
		TupleGenerator,
		ObjectGenerator,
		StringGenerator,
		NumberGenerator,
	]);

	test('produces a valid empty tuple', () => {
		expect(transform).toReasonablySatisfy(z.tuple([]));
	});

	test('produces a valid tuple', () => {
		expect(transform).toReasonablySatisfy(z.tuple([z.number(), z.string()]));
	});

	test('creates a tuple and preserves types', () => {
		const input = z.tuple([
			z.string(), // name
			z.number(), // jersey number
			z.object({
				pointsStransformd: z.number(),
			}), // statistics
		]);
		const result = transform.fromSchema(input);

		type I = z.infer<typeof input>;

		expect(result).toHaveLength(3);
		expect((result as I)[0]).toBeTypeOf('string');
		expect((result as I)[1]).toBeTypeOf('number');
		expect((result as I)[2]).toBeTypeOf('object');
		expect((result as I)[2].pointsStransformd).toBeTypeOf('number');
	});

	test('creates a tuple with variadic rest argument', () => {
		const input = z.tuple([z.string()]).rest(z.number());
		const result = transform.fromSchema(input);
		type I = z.infer<typeof input>;

		expect(result as I).toHaveLength(2);
		expect((result as I)[0]).toBeTypeOf('string');
		expect((result as I)[1]).toBeTypeOf('number');
	});
});
