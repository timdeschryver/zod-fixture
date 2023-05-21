import { Generator } from '@/core/generator';
import { ZodLiteral } from 'zod';

export const LiteralGenerator = Generator({
	schema: ZodLiteral,
	matches: () => true,
	output: ({ def }) => def.value,
});