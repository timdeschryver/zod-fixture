import { Generator } from '@/core/generator';
import { ZodNull } from 'zod';

export const NullGenerator = Generator({
	schema: ZodNull,
	matches: () => true,
	output: () => null,
});
