import { ZodDefault } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const DefaultGenerator = Generator({
	schema: ZodDefault,
	output: ({ def, transform }) =>
		transform.utils.random.boolean()
			? def.defaultValue()
			: transform.fromSchema(def.innerType),
});
