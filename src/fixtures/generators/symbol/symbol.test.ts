import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { SymbolGenerator } from '.';

describe('create a symbol type', () => {
	const core = new Transformer().extend([SymbolGenerator]);

	test('produces a valid symbol', () => {
		expect(core).toProduce(z.symbol());
	});

	test('creates a symbol', () => {
		expect(core.generate(z.symbol())).toBeTypeOf('symbol');
	});
});
