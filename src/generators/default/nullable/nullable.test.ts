import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NullableGenerator } from '.';
import { StringGenerator } from '../string';

describe('create empty types', () => {
	const core = new Core().register([NullableGenerator, StringGenerator]);

	test('creates a nullable string', () => {
		expect(core.generate(z.string().nullable(), { path: [] })).toBeTypeOf('string');
	});
});
