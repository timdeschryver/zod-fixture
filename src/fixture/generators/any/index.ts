import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const AnyGenerator = Generator({
	schema: z.any(),
	// @TODO: implement a more robust any generator.
	output: () => 'ZodAny',
});
