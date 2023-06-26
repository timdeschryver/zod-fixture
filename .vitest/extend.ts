import { expect } from 'vitest';

const ITERATIONS = 100;

expect.extend({
	toProduce(core, schema, result) {
		for (let i = 0; i < ITERATIONS; i++) {
			const fixture = core.generate(schema);
			const { success: pass, error } = schema.safeParse(fixture);

			if (!pass)
				return {
					pass,
					message: () =>
						JSON.stringify(
							{
								fixture,
								seed: core.seed,
								error,
							},
							null,
							2
						),
				};

			if (result !== undefined) {
				expect(fixture).toBe(result);
			}
		}

		return {
			pass: true,
			message: () => `Successfully ran ${ITERATIONS} iterations.`,
		};
	},
});
