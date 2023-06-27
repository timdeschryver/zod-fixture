import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NullGenerator } from '.';

describe('create empty types', () => {
	const core = new Core().register([NullGenerator]);

	test('produces a valid null', () => {
		expect(core).toProduce(z.null());
	});

	test('creates a null', () => {
		expect(core.generate(z.null())).toBeNull();
	});
});