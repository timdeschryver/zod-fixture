import { expect } from 'vitest';

expect.extend({
	toBeZodType(actual, { schema, core }) {
		const { success: pass, error } = schema.safeParse(actual);

		return {
			pass,
			message: () =>
				JSON.stringify({
					fixture: actual,
					seed: core.seed,
					error,
				}, null, 2),
		};
	},
});
