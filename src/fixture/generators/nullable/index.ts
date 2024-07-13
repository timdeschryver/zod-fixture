import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const NullableGenerator = Generator({
	schema: z.any().nullable(),
	output: ({ def, transform, context }) => {
		let result = null;

		if (transform.utils.random.boolean()) {
			transform.utils.recursionCheck(def.innerType, () => {
				result = transform.fromSchema(def.innerType, context);
			});
		}

		return result;
	},
});
