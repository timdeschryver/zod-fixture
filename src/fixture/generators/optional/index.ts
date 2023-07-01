import { Generator } from '@/transformer/generator';
import { ZodOptional } from 'zod';

export const OptionalGenerator = Generator({
	schema: ZodOptional,
	output: ({ def, transform, context }) =>
		transform.from(def.innerType, context),
});
