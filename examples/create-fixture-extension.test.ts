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

const PersonSchema = z.object({
	name: z.string(),
	birthday: z.date(),
	address: z.object({
		street: z.string(),
		city: z.string(),
		state: z.string(),
	}),
	pets: z.array(z.object({ name: z.string(), breed: z.string() })),
	totalVisits: z.number(),
});

const fixture = new Fixture({ seed: 38 }).extend([
	addressGenerator,
	totalVisitsGenerator,
]);
const person = fixture.fromSchema(PersonSchema);
// #endregion example

const output = Object.assign(
	// #region output
	{
		address: {
			city: 'My City',
			state: 'My State',
			street: 'My Street',
		},
		birthday: new Date('1926-02-23T02:07:24.494Z'),
		name: 'c',
		pets: [
			{
				breed: '5yOQfkYfI6=kRuH^F?5BCNHft',
				name: 'mYxRp1GBY2aw',
			},
			{
				breed: '6Qz\\s',
				name: '_',
			},
			{
				breed: '6e9',
				name: ';l]@',
			},
		],
		totalVisits: 22,
	}
	// #endregion output
);

test('generates a person', () => {
	expect(person).toEqual(output);
});
