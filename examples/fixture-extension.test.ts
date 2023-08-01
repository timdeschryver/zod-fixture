import { expect, test } from 'vitest';
// #region example
import { ZodNumber, ZodObject, z } from 'zod';
import { Fixture, Generator } from 'zod-fixture';

// #region generator
const totalVisitsGenerator = Generator({
	schema: ZodNumber,
	filter: ({ context }) => context.path.at(-1) === 'totalVisits',
	/**
	 * The `context` provides a path to the current field
	 *
	 * {
	 *   totalVisits: ...,
	 *   nested: {
	 *     totalVisits: ...,
	 *   }
	 * }
	 *
	 * Would match twice with the following paths:
	 *   ['totalVisits']
	 *   ['nested', 'totalVisits']
	 */

	// returns a more realistic number of visits.
	output: ({ transform }) => transform.utils.random.int({ min: 0, max: 25 }),
});
// #endregion generator

const addressGenerator = Generator({
	schema: ZodObject,
	filter: ({ context }) => context.path.at(-1) === 'address',
	// returns a custom address object
	output: () => ({
		street: 'My Street',
		city: 'My City',
		state: 'My State',
	}),
});

const personSchema = z.object({
	name: z.string(),
	birthday: z.date(),
	address: z.object({
		street: z.string(),
		city: z.string(),
		state: z.string(),
	}),
	pets: z.array(z.object({ name: z.string(), breed: z.string() })),
	totalVisits: z.number().int().positive(),
});

const fixture = new Fixture({ seed: 38 }).extend([
	addressGenerator,
	totalVisitsGenerator,
]);
const person = fixture.fromSchema(personSchema);
// #endregion example

const output = Object.assign(
	// #region output
	{
		address: {
			city: 'My City',
			state: 'My State',
			street: 'My Street',
		},
		birthday: new Date('2066-08-15T02:38:13.057Z'),
		name: 'xyzyskryqofekdg',
		pets: [
			{
				breed: 'nlwozmxaigobrzz',
				name: 'hvlrnsxroqpumas',
			},
			{
				breed: 'fbgglityarecl-q',
				name: '-lmtvotjcevmyiq',
			},
			{
				breed: 'mylchvprjdgelkq',
				name: 'devqfcctdx-link',
			},
		],
		totalVisits: 10,
	}
	// #endregion output
);

test('generates a person', () => {
	expect(person).toMatchInlineSnapshot(`
		{
		  "address": {
		    "city": "My City",
		    "state": "My State",
		    "street": "My Street",
		  },
		  "birthday": 2066-08-15T02:38:13.057Z,
		  "name": "xyzyskryqofekdg",
		  "pets": [
		    {
		      "breed": "nlwozmxaigobrzz",
		      "name": "hvlrnsxroqpumas",
		    },
		    {
		      "breed": "fbgglityarecl-q",
		      "name": "-lmtvotjcevmyiq",
		    },
		    {
		      "breed": "mylchvprjdgelkq",
		      "name": "devqfcctdx-link",
		    },
		  ],
		  "totalVisits": 10,
		}
	`);
	expect(person).toEqual(output);
});
