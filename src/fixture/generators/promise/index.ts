import { ZodPromise } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const PromiseGenerator = Generator({
	schema: ZodPromise,
	output: ({ def, transform, context }) => {
		// TODO: this fallback isn't correct but architecting something that is
		// would probably be a major refactor.
		let result = undefined;

		transform.utils.recursionCheck(def.type, () => {
			result = transform.fromSchema(def.type, context);
		});

		return Promise.resolve(result);
	},
});
