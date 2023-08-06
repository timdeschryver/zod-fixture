import { ZodNullable } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const NullableGenerator = Generator({
	schema: ZodNullable,
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
