import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { UndefinedGenerator } from '.';

describe('create empty types', () => {
	const core = new Transformer().extend([UndefinedGenerator]);

	test('produces a valid undefined', () => {
		expect(core).toProduce(z.undefined());
	});

	test('creates an undefined', () => {
		expect(core.from(z.undefined())).toBeUndefined();
	});
});
