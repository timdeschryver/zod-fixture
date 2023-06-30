import { expect } from 'vitest';
import { ZodTypeAny } from 'zod';

expect.extend({
	toReasonablySatisfy(core, schema: ZodTypeAny, iterations = 100) {
		for (let i = 0; i < iterations; i++) {
			const fixture = core.generate(schema);
			const result = schema.safeParse(fixture);

			if (result.success === false) {
				const { seed } = core;
				const { success: pass, error } = result;

				return {
					pass,
					message: () => JSON.stringify({ fixture, seed, error }, null, 2),
				};
			}
		}

		return {
			pass: true,
			message: () => `Successfully ran ${iterations} iterations.`,
		};
	},
});
