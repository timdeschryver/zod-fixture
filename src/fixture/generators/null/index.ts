import { Generator } from '@/transformer/generator';
import { ZodNull } from 'zod';

export const NullGenerator = Generator({
	schema: ZodNull,
	output: () => null,
});
