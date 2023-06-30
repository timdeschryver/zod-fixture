import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { TupleGenerator } from '.';
import { NumberGenerator } from '../number';
import { ObjectGenerator } from '../object';
import { StringGenerator } from '../string';

describe('create Tuples', () => {
	const core = new Transformer().extend([
		TupleGenerator,
		ObjectGenerator,
		StringGenerator,
		NumberGenerator,
	]);

	test('produces a valid empty tuple', () => {
		expect(core).toProduce(z.tuple([]));
	});

	test('produces a valid tuple', () => {
		expect(core).toProduce(z.tuple([z.number(), z.string()]));
	});

	test('creates a tuple and preserves types', () => {
		const input = z.tuple([
			z.string(), // name
			z.number(), // jersey number
			z.object({
				pointsScored: z.number(),
			}), // statistics
		]);
		const result = core.from(input);

		type I = z.infer<typeof input>;

		expect(result).toHaveLength(3);
		expect((result as I)[0]).toBeTypeOf('string');
		expect((result as I)[1]).toBeTypeOf('number');
		expect((result as I)[2]).toBeTypeOf('object');
		expect((result as I)[2].pointsScored).toBeTypeOf('number');
	});

	test('creates a tuple with variadic rest argument', () => {
		const input = z.tuple([z.string()]).rest(z.number());
		const result = core.from(input);
		type I = z.infer<typeof input>;

		expect(result as I).toHaveLength(2);
		expect((result as I)[0]).toBeTypeOf('string');
		expect((result as I)[1]).toBeTypeOf('number');
	});
});
