import { Generator } from '@/core/generator';
import { ZodNullable } from 'zod';

export const NullableGenerator = Generator({
	schema: ZodNullable,
	test: () => true,
	output: ({ def, core }) => core.generate(def.innerType)
});
