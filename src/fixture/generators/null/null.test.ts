import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NullGenerator } from '.';

describe('create empty types', () => {
	const transform = new Transformer().extend([NullGenerator]);

	test('produces a valid null', () => {
		expect(transform).toProduce(z.null());
	});

	test('creates a null', () => {
		expect(transform.from(z.null())).toBeNull();
	});
});
