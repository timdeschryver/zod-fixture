import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { TupleGenerator } from '.';
import { NumberGenerator } from '../number';
import { ObjectGenerator } from '../object';
import { StringGenerator } from '../string';

describe('create Tuples', () => {
	const core = new Core().register([
		TupleGenerator,
		ObjectGenerator,
		StringGenerator,
		NumberGenerator,
	]);

	test('creates a tuple and preserves types', () => {
		const input = z.tuple([
			z.string(), // name
			z.number(), // jersey number
			z.object({
				pointsScored: z.number(),
			}), // statistics
		]);
		const result = core.generate(input);

		expect(result).toHaveLength(3);
		expect(result[0]).toBeTypeOf('string');
		expect(result[1]).toBeTypeOf('number');
		expect(result[2]).toBeTypeOf('object');
		expect(result[2].pointsScored).toBeTypeOf('number');
	});

	test('creates a tuple with variadic rest argument', () => {
		const input = z.tuple([z.string()]).rest(z.number());
		const result = core.generate(input);

		expect(result).toHaveLength(2);
		expect(result[0]).toBeTypeOf('string');
		expect(result[1]).toBeTypeOf('number');
	});
});
