import { Generator } from '@/transformer/generator';
import { ZodNever } from 'zod';

export const NeverGenerator = Generator({
	schema: ZodNever,
	output: () => {
		throw new Error(
			`Never is a sanity check by Zod to ensure fields don't exist. If we've reached this point, something went wrong during fixture generation.`
		);
	},
});
