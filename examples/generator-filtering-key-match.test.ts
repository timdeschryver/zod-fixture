import { expect, test } from 'vitest';
// #region example
import { z, ZodString } from 'zod';
import { Fixture, Generator } from 'zod-fixture';

const NameGenerator = Generator({
	schema: ZodString,
	filter: ({ context }) => context.path.at(-1) === 'name',
	output: () => 'John Doe',
});

const personSchema = z.object({
	name: z.string(), // this matches ['name']
	email: z.string().email(),
	relatives: z
		.object({
			name: z.string(), // this will match as well ['relatives', 'name']
			email: z.string().email(),
		})
		.array(),
});

const fixture = new Fixture({ seed: 7 }).extend(NameGenerator);
const person = fixture.fromSchema(personSchema);
// #endregion example

const output = Object.assign(
	// #region output
	{
		email: 'rando@email.com',
		name: 'John Doe',
		relatives: [
			{
				email: 'rando@email.com',
				name: 'John Doe',
			},
			{
				email: 'rando@email.com',
				name: 'John Doe',
			},
			{
				email: 'rando@email.com',
				name: 'John Doe',
			},
		],
	}
	// #endregion output
);

test('generates a person', () => {
	expect(person).toMatchInlineSnapshot(`
		{
		  "email": "rando@email.com",
		  "name": "John Doe",
		  "relatives": [
		    {
		      "email": "rando@email.com",
		      "name": "John Doe",
		    },
		    {
		      "email": "rando@email.com",
		      "name": "John Doe",
		    },
		    {
		      "email": "rando@email.com",
		      "name": "John Doe",
		    },
		  ],
		}
	`);
	expect(person).toEqual(output);
});
