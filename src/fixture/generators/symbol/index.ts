import { ZodSymbol } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const SymbolGenerator = Generator({
	schema: ZodSymbol,
	output: ({ transform }) =>
		Symbol.for(transform.utils.random.lorem(1, 'word')),
});
