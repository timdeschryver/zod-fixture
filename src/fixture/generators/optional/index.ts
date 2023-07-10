import { ZodOptional } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const OptionalGenerator = Generator({
	schema: ZodOptional,
	output: ({ def, transform, context }) =>
		transform.from(def.innerType, context),
});
