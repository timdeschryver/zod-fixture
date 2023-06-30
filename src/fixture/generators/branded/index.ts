import { Generator } from '@/transformer/generator';
import { ZodBranded } from 'zod';

export const BrandedGenerator = Generator({
	schema: ZodBranded,
	output: ({ def, transform, context }) => transform.from(def.type, context),
});
