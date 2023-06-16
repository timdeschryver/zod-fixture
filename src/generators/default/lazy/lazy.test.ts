import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { LazyGenerator } from '.';
import { NumberGenerator } from '../number';

describe('create a lazy type', () => {
	const core = new Core().register([LazyGenerator, NumberGenerator]);

	test('creates a promise with the correct type', () => {
		expect(
			core.generate(
				z.lazy(() => z.number()),
				{ path: [] }
			)
		).toBeTypeOf('number');
	});
});
