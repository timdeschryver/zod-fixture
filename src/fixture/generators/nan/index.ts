import { ZodNaN } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const NanGenerator = Generator({
	schema: ZodNaN,
	output: () => NaN,
});
