import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const NeverGenerator = Generator({
	schema: z.never(),
	output: () => {
		throw new Error(
			`Never is a sanity check by Zod to ensure fields don't exist. If we've reached this point, something went wrong during fixture generation.`,
		);
	},
});
