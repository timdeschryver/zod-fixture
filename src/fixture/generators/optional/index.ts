import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const OptionalGenerator = Generator({
	schema: z.optional(z.any()),
	output: ({ def, transform, context }) => {
		let result = undefined;

		if (transform.utils.random.boolean()) {
			transform.utils.recursionCheck(def.innerType, () => {
				result = transform.fromSchema(def.innerType, context);
			});
		}

		return result;
	},
});
