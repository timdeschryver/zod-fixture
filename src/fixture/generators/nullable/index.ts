import { ZodNullable } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const NullableGenerator = Generator({
	schema: ZodNullable,
	output: ({ def, transform, context }) =>
		transform.from(def.innerType, context),
});
