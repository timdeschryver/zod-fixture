import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const FunctionGenerator = Generator({
	schema: z.function(),
	output: ({ transform }) => transform.utils.noop,
});
