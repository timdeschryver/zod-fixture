import { Generator } from '@/transformer/generator';
import { ZodSymbol } from 'zod';

export const SymbolGenerator = Generator({
	schema: ZodSymbol,
	output: ({ transform }) =>
		Symbol.for(transform.utils.random.lorem(1, 'word')),
});
