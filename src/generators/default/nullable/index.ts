import { Generator } from '@/core/generator';
import { ZodNullable } from 'zod';

export const NullableGenerator = Generator({
	schema: ZodNullable,
	matches: () => true,
	output: ({ def, core, context }) => core.generate(def.innerType, context),
});
