import { expect } from 'vitest';

const ITERATIONS = 100;

expect.extend({
	toProduce(transform, schema, result) {
		for (let i = 0; i < ITERATIONS; i++) {
			const fixture = transform.from(schema);
			const { success: pass, error } = schema.safeParse(fixture);

			if (!pass)
				return {
					pass,
					message: () =>
						JSON.stringify(
							{
								fixture,
								seed: transform.seed,
								error,
							},
							null,
							2
						),
				};

			if (arguments.length === 3) {
				expect(fixture).toBe(result);
			}
		}

		return {
			pass: true,
			message: () => `Successfully ran ${ITERATIONS} iterations.`,
		};
	},
});
