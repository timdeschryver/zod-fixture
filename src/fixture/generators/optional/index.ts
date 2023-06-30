import { Generator } from '@/transformer/generator';
import { ZodOptional } from 'zod';

export const OptionalGenerator = Generator({
	schema: ZodOptional,
	output: ({ def, core, context }) => core.from(def.innerType, context),
});
