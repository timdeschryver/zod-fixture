import { expect, test } from 'vitest';
import { ZodNumber, ZodObject, z } from 'zod';
import { Fixture, Generator } from 'zod-fixture';

test('generates a person using custom generators', () => {
	const addressGenerator = Generator({
		// we're interested in zod objects
		schema: ZodObject,
		// we only want to change the behavior of the address object
		filter: ({ context }) => context.path.at(-1) === 'address',
		// we return our desired output based on a custom implementation
		output: () => ({
			street: 'My Street',
			city: 'My City',
			state: 'My State',
		}),
	});

	const totalVisitsGenerator = Generator({
		// we're interested in zod objects
		schema: ZodNumber,
		// we return our desired output based on a custom implementation
		output: ({ transform }) => transform.utils.random.int({ min: 0, max: 25 }),
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
		veterinarian: z.object({
			name: z.string(),
			address: z.object({
				street: z.string(),
				city: z.string(),
				state: z.string(),
			}),
		}),
		totalVisits: z.number(),
	});

	const fixture = new Fixture({ seed: 38 }).extend([
		addressGenerator,
		totalVisitsGenerator,
	]);
	const person = fixture.from(PersonSchema);

	expect(person).toMatchInlineSnapshot(`
		{
		  "address": {
		    "city": "My City",
		    "state": "My State",
		    "street": "My Street",
		  },
		  "birthday": 1926-02-23T02:07:24.494Z,
		  "name": "c",
		  "pets": [
		    {
		      "breed": "5yOQfkYfI6=kRuH^F?5BCNHft",
		      "name": "mYxRp1GBY2aw",
		    },
		    {
		      "breed": "6Qz\\\\s",
		      "name": "_",
		    },
		    {
		      "breed": "6e9",
		      "name": ";l]@",
		    },
		  ],
		  "totalVisits": 21,
		  "veterinarian": {
		    "address": {
		      "city": "My City",
		      "state": "My State",
		      "street": "My Street",
		    },
		    "name": "zNHTN?SsO6FlZ_K8B;QN]OH",
		  },
		}
	`);
});
