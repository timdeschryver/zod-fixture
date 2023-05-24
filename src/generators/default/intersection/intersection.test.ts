import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { IntersectionGenerator } from '.';
import { ArrayGenerator } from '../array';
import { BooleanGenerator } from '../boolean';
import { ObjectGenerator } from '../object';

describe('create intersections', () => {
	const core = new Core().register([IntersectionGenerator, ObjectGenerator, BooleanGenerator, ArrayGenerator]);

	test('creates an intersection of objects', () => {
		const left = z.object({
			left: z.boolean(),
		});

		const right = z.object({
			right: z.boolean(),
		});

		const intersection = z.intersection(left, right);
		const result = core.generate(intersection, { path: [] });

		expect(result).toHaveProperty('left');
		expect(result).toHaveProperty('right');
        expect(result).toMatchObject({
            left: expect.any(Boolean),
            right: expect.any(Boolean)
        })
	});

    test('creates an intersection of arrays', () => {
        const left = z.object({
			left: z.boolean(),
		}).array();

		const right = z.object({
			right: z.boolean(),
		}).array();

		const intersection = z.intersection(left, right);
		const result = core.generate(intersection, { path: [] }) as any[];

		expect(result[0]).toHaveProperty('left');
		expect(result[0]).toHaveProperty('right');
    })
});
