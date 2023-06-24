import { Generator } from '@/core/generator';
import { ZodNaN } from 'zod';

export const NanGenerator = Generator({
	schema: ZodNaN,
	output: () => NaN,
});