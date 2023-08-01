import { ZodBoolean } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const BooleanGenerator = Generator({
	schema: ZodBoolean,
	output: ({ transform }) => transform.utils.random.boolean(),
});
