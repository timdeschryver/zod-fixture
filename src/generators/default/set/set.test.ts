import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { SetGenerator } from '.';
import { NumberGenerator } from '../number';

describe('create Sets', () => {
	const core = new Core().register([SetGenerator, NumberGenerator]);

	test('creates a Set with 3 entries', () => {
		const input = z.set(z.number());
		const result = core.generate(input);

		expect(result.size).toBe(3);
		expect([...result.keys()][0]).toBeTypeOf('number');
		expect([...result.values()][0]).toBeTypeOf('number');
	});
});
