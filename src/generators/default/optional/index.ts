import { Generator } from '@/core/generator';
import { ZodOptional } from 'zod';

export const OptionalGenerator = Generator({
	schema: ZodOptional,
	matches: () => true,
	output: ({ def, core }) => core.generate(def.innerType)
});
