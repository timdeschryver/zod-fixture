import { expect } from 'vitest';
import type { ZodTypeAny } from 'zod';

expect.extend({
	toReasonablySatisfy(
		transform,
		schema: ZodTypeAny,
		iterations = process.env.SATISFY_ITERATIONS || 100
	) {
		for (let i = 0; i < iterations; i++) {
			const fixture = transform.fromSchema(schema);
			const result = schema.safeParse(fixture);

			if (result.success === false) {
				const { seed } = transform;
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
