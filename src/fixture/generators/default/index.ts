import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const DefaultGenerator = Generator({
	schema: z.any().default(z.any()),
	output: ({ def, transform }) =>
		transform.utils.random.boolean()
			? def.defaultValue()
			: transform.fromSchema(def.innerType),
});
