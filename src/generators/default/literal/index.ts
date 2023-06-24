import { Generator } from '@/core/generator';
import { ZodLiteral } from 'zod';

export const LiteralGenerator = Generator({
	schema: ZodLiteral,
	output: ({ def }) => def.value,
});