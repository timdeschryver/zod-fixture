import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { SymbolGenerator } from '.';

describe('create a symbol type', () => {
	const core = new Core().register([SymbolGenerator]);

	test('creates a symbol', () => {
		expect(core.generate(z.symbol())).toBeTypeOf('symbol');
	});
});
