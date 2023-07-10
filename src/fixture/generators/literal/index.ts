import { ZodLiteral } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const LiteralGenerator = Generator({
	schema: ZodLiteral,
	output: ({ def }) => def.value,
});
