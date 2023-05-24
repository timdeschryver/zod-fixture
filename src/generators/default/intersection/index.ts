import { Generator } from '@/core/generator';
import { ZodIntersection } from 'zod';

export const IntersectionGenerator = Generator({
	schema: ZodIntersection,
	matches: () => true,
	output: ({ def, core }) => {
		const left = core.generate(def.left);
		const right = core.generate(def.right);

		return Object.assign({}, left, right);
	},
});
