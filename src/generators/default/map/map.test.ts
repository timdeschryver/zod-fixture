import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { MapGenerator } from '.';
import { NumberGenerator } from '../number';
import { StringGenerator } from '../string';

describe('create Maps', () => {
	const core = new Core().register([
		MapGenerator,
		StringGenerator,
		NumberGenerator,
	]);

	test('creates a Map with 3 entries', () => {
		const input = z.map(z.string(), z.number());
		const result = core.generate(input);

		expect(result.size).toBe(3);
		expect([...result.keys()][0]).toBeTypeOf('string');
		expect([...result.values()][0]).toBeTypeOf('number');
	});
});
