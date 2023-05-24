import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { SymbolGenerator } from '.';

describe('create empty types', () => {
	const core = new Core().register([SymbolGenerator]);

	test('creates a symbol', () => {
		expect(core.generate(z.symbol(), { path: [] })).toBeTypeOf('symbol');
	});
});