import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { UndefinedGenerator } from '.';

describe('create empty types', () => {
	const core = new Core().register([UndefinedGenerator]);

	test('produces a valid undefined', () => {
		expect(core).toProduce(z.undefined());
	});

	test('creates an undefined', () => {
		expect(core.generate(z.undefined())).toBeUndefined();
	});
});
