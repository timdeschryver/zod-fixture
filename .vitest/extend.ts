import { expect } from 'vitest';
import type { ZodTypeAny } from 'zod';
import { ITERATIONS } from './utils';

expect.extend({
	toReasonablySatisfy(transform, schema: ZodTypeAny, iterations = ITERATIONS) {
		for (let i = 0; i < iterations; i++) {
			const fixture = transform.fromSchema(schema);
			const result = schema.safeParse(fixture);

			if (result.success === false) {
				const { seed } = transform;
				const { success: pass, error } = result;

				return {
					pass,
					message: () =>
						JSON.stringify(
							{ fixture, seed, error },
							(_key, value) =>
								// javascript does not natively support bigints in JSON.stringify
								// https://github.com/GoogleChromeLabs/jsbi/issues/30
								typeof value === 'bigint' ? value.toString() : value,
							2,
						),
				};
			}
		}

		return {
			pass: true,
			message: () => `Successfully ran ${iterations} iterations.`,
		};
	},
});
