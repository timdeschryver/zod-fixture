import { Generator } from '@/core/generator';
import { ZodSymbol } from 'zod';

export const SymbolGenerator = Generator({
	schema: ZodSymbol,
	matches: () => true,
	output: ({ core }) => Symbol.for(core.utils.random.lorem(1, 'word')),
});
