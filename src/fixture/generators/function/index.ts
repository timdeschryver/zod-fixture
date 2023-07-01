import { Generator } from '@/transformer/generator';
import { ZodFunction } from 'zod';

export const FunctionGenerator = Generator({
	schema: ZodFunction,
	output: ({ transform }) => transform.utils.noop,
});
