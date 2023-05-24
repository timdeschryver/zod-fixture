import { Generator } from '@/core/generator';
import { ZodBranded } from 'zod';

export const BrandedGenerator = Generator({
	schema: ZodBranded,
	matches: () => true,
	output: ({ def, core, ctx }) => core.generate(def.type, ctx),
});
