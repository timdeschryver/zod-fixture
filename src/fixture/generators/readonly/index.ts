import { ZodReadonly } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const ReadonlyGenerator = Generator({
	schema: ZodReadonly,
	output: ({ transform, def }) => {
		const result = transform.fromSchema(def.innerType);
		return Object.freeze(result);
	},
});
