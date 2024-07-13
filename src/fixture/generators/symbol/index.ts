import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const SymbolGenerator = Generator({
	schema: z.symbol(),
	output: ({ transform }) =>
		Symbol.for(transform.utils.random.lorem(1, 'word')),
});
