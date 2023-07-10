import { ZodFunction } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const FunctionGenerator = Generator({
	schema: ZodFunction,
	output: ({ transform }) => transform.utils.noop,
});
