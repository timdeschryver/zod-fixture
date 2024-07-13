import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const UnknownGenerator = Generator({
	schema: z.unknown(),
	// @TODO: implement a more robust unknown generator.
	output: () => 'ZodUnknown',
});
