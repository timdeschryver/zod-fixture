import { Generator } from '@/core/generator';
import { ZodFunction } from 'zod';

export const FunctionGenerator = Generator({
	schema: ZodFunction,
	output: ({ core }) => core.utils.noop,
});