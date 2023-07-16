import { expect, test } from 'vitest';
// #region example
import { z, ZodString } from 'zod';
import { Fixture, Generator } from 'zod-fixture';

const EmailGenerator = Generator({
	schema: ZodString,
	filter: ({ transform, def }) =>
		transform.utils.checks(def.checks).has('email'),
	output: () => 'john.malkovich@gmail.com',
});

const StringGenerator = Generator({
	schema: ZodString,
	output: ({ transform, def }) => {
		let min = transform.utils.checks(def.checks).find('min')?.value;
		/**
		 *     kind: "min";
		 *     value: number;
		 *     message?: string | undefined; // a custom error message
		 */

		let max = transform.utils.checks(def.checks).find('max')?.value;
		/**
		 *     kind: "max";
		 *     value: number;
		 *     message?: string | undefined; // a custom error message
		 */

		const length = transform.utils.checks(def.checks).find('length');
		/**
		 *     kind: "length";
		 *     value: number;
		 *     message?: string | undefined; // a custom error message
		 */

		if (length) {
			min = length.value;
			max = length.value;
		}

		return transform.utils.random.string({ min, max });
	},
});

const PersonSchema = z.object({
	name: z.string().max(10),
	email: z.string().email(),
});

const fixture = new Fixture({ seed: 38 }).extend([
	EmailGenerator,
	StringGenerator,
]);
const person = fixture.fromSchema(PersonSchema);
// #endregion example

const output = Object.assign(
	// #region output
	{
		email: 'john.malkovich@gmail.com',
		name: 'sdnlwozmxa',
	}
	// #endregion output
);

test('generates a person', () => {
	expect(person).toMatchInlineSnapshot(`
		{
		  "email": "john.malkovich@gmail.com",
		  "name": "sdnlwozmxa",
		}
	`);
	expect(person).toEqual(output);
});
