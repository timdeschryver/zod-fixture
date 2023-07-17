import { ZodNull } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const NullGenerator = Generator({
	schema: ZodNull,
	output: () => null,
});
