import { Generator } from '@/core/generator';
import { ZodBranded } from 'zod';

export const BrandedGenerator = Generator({
	schema: ZodBranded,
	matches: () => true,
	output: ({ def, core, context }) => core.generate(def.type, context),
});
