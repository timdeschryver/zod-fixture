import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { BigIntGenerator, BigIntMultipleOfGenerator } from '.';

describe('create bigint', () => {
	const transform = new Transformer().extend([
		BigIntGenerator,
		BigIntMultipleOfGenerator,
	]);

	test('produces a valid bigint', () => {
		expect(transform).toProduce(z.bigint());
	});

	test('creates a bigint between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER', () => {
		const result = transform.from(z.bigint());

		expect(result).toBeTypeOf('bigint');
		expect(result).toBeGreaterThanOrEqual(Number.MIN_SAFE_INTEGER);
		expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
	});
});
