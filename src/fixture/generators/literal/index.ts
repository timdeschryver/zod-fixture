import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const LiteralGenerator = Generator({
	schema: z.literal(''),
	output: ({ def }) => def.value,
});
