import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { BigIntGenerator, BigIntMultipleOfGenerator } from '.';

describe('create bigint', () => {
	const core = new Transformer().extend([
		BigIntGenerator,
		BigIntMultipleOfGenerator,
	]);

	test('produces a valid bigint', () => {
		expect(core).toProduce(z.bigint());
	});

	test('creates a bigint between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER', () => {
		const result = core.generate(z.bigint());

		expect(result).toBeTypeOf('bigint');
		expect(result).toBeGreaterThanOrEqual(Number.MIN_SAFE_INTEGER);
		expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
	});
});
