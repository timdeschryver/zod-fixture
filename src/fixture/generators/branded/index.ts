import { ZodBranded } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const BrandedGenerator = Generator({
	schema: ZodBranded,
	output: ({ def, transform, context }) => transform.from(def.type, context),
});
