import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const BrandedGenerator = Generator({
	schema: z.any().brand(),
	output: ({ def, transform, context }) =>
		transform.fromSchema(def.type, context),
});
