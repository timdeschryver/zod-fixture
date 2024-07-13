import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const NullGenerator = Generator({
	schema: z.null(),
	output: () => null,
});
