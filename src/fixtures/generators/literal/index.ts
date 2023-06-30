import { Generator } from '@/transformer/generator';
import { ZodLiteral } from 'zod';

export const LiteralGenerator = Generator({
	schema: ZodLiteral,
	output: ({ def }) => def.value,
});
