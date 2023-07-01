import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { IntersectionGenerator } from '.';
import { ArrayGenerator } from '../array';
import { BooleanGenerator } from '../boolean';
import { ObjectGenerator } from '../object';

describe('create intersections', () => {
	const transform = new Transformer().extend([
		IntersectionGenerator,
		ObjectGenerator,
		BooleanGenerator,
		ArrayGenerator,
	]);

	test('produces a valid intersection', () => {
		const left = z.object({
			left: z.boolean(),
		});

		const right = z.object({
			right: z.boolean(),
		});

		expect(transform).toProduce(z.intersection(left, right));
	});

	test('creates an intersection of objects', () => {
		const left = z.object({
			left: z.boolean(),
		});

		const right = z.object({
			right: z.boolean(),
		});

		const intersection = z.intersection(left, right);
		const result = transform.from(intersection);

		expect(result).toHaveProperty('left');
		expect(result).toHaveProperty('right');
		expect(result).toMatchObject({
			left: expect.any(Boolean),
			right: expect.any(Boolean),
		});
	});

	test('creates an intersection of arrays', () => {
		const left = z
			.object({
				left: z.boolean(),
			})
			.array();

		const right = z
			.object({
				right: z.boolean(),
			})
			.array();

		const intersection = z.intersection(left, right);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const result = transform.from(intersection) as any[];

		expect(result[0]).toHaveProperty('left');
		expect(result[0]).toHaveProperty('right');
	});
});
