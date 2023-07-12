import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NeverGenerator } from '.';

describe('create never', () => {
	const transform = new Transformer().extend([NeverGenerator]);

	test('never should throw', () => {
		expect(() => transform.fromSchema(z.never())).toThrowError();
	});

	// @TODO: add additional tests to ensure iterables (object, array, set, map, etc) never produce fields with never
});
