import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const BooleanGenerator = Generator({
	schema: z.boolean(),
	output: ({ transform }) => transform.utils.random.boolean(),
});
