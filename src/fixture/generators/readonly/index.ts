import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const ReadonlyGenerator = Generator({
	schema: z.any().readonly(),
	output: ({ transform, def }) => {
		const result = transform.fromSchema(def.innerType);
		return Object.freeze(result);
	},
});
