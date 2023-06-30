import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { NullGenerator } from '.';

describe('create empty types', () => {
	const core = new Transformer().extend([NullGenerator]);

	test('produces a valid null', () => {
		expect(core).toProduce(z.null());
	});

	test('creates a null', () => {
		expect(core.from(z.null())).toBeNull();
	});
});
