import { Generator } from '@/core/generator';
import { ZodOptional } from 'zod';

export const OptionalGenerator = Generator({
	schema: ZodOptional,
	output: ({ def, core, context }) => core.generate(def.innerType, context),
});
