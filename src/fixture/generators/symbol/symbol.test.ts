import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { SymbolGenerator } from '.';

describe('create a symbol type', () => {
	const transform = new Transformer().extend([SymbolGenerator]);

	test('produces a valid symbol', () => {
		expect(transform).toReasonablySatisfy(z.symbol());
	});

	test('creates a symbol', () => {
		expect(transform.from(z.symbol())).toBeTypeOf('symbol');
	});
});
