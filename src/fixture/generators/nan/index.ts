import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const NanGenerator = Generator({
	schema: z.nan(),
	output: () => NaN,
});
