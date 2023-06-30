import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { AnyGenerator } from '.';
import { NumberGenerator } from '../number';

describe('create any', () => {
	test('produces an any', () => {
		const core = new Core().register([AnyGenerator]);
		expect(core).toReasonablySatisfy(z.any());
	});

	test('creates a value for the registered generator', () => {
		const core = new Core().register([AnyGenerator, NumberGenerator]);
		const schema = z.any();
		expect(core).toReasonablySatisfy(schema);
		expect(core.generate(schema)).toBeTypeOf('number');
	});
});
