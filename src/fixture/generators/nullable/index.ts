import { Generator } from '@/transformer/generator';
import { ZodNullable } from 'zod';

export const NullableGenerator = Generator({
	schema: ZodNullable,
	output: ({ def, transform, context }) =>
		transform.from(def.innerType, context),
});
