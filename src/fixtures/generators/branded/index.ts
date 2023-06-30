import { Generator } from '@/transformer/generator';
import { ZodBranded } from 'zod';

export const BrandedGenerator = Generator({
	schema: ZodBranded,
	output: ({ def, core, context }) => core.generate(def.type, context),
});
