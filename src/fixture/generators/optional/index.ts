import { ZodOptional } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const OptionalGenerator = Generator({
	schema: ZodOptional,
	output: ({ def, transform, context }) => {
		let result = undefined;

		transform.utils.recursionCheck(def.innerType, () => {
			result = transform.fromSchema(def.innerType, context);
		});

		return result;
	},
});
