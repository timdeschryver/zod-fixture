import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { IntersectionGenerator } from '.';
import { BooleanGenerator } from '../boolean';
import { ObjectGenerator } from '../object';

describe('create intersections', () => {
	const core = new Core().register([IntersectionGenerator, ObjectGenerator, BooleanGenerator]);

	test('creates an intersection', () => {
		const left = z.object({
			left: z.boolean(),
		});

		const right = z.object({
			right: z.boolean(),
		});

		const intersection = z.intersection(left, right);
		const result = core.generate(intersection);

		expect(result).toHaveProperty('left');
		expect(result).toHaveProperty('right');
        expect(result).toMatchObject({
            left: expect.any(Boolean),
            right: expect.any(Boolean)
        })
	});
});
