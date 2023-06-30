import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { UndefinedGenerator } from '.';

describe('create empty types', () => {
	const transform = new Transformer().extend([UndefinedGenerator]);

	test('produces a valid undefined', () => {
		expect(transform).toProduce(z.undefined());
	});

	test('creates an undefined', () => {
		expect(transform.from(z.undefined())).toBeUndefined();
	});
});
