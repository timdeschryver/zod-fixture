import { Generator } from '@/transformer/generator';
import { ZodNullable } from 'zod';

export const NullableGenerator = Generator({
	schema: ZodNullable,
	output: ({ def, core, context }) => core.from(def.innerType, context),
});
