import { expect, test } from 'vitest';
// #region example
import { z } from 'zod';
import { createFixture } from 'zod-fixture';

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

const person = createFixture(personSchema, { seed: 11 });
// #endregion example

const output = Object.assign(
	// #region output
	{
		address: {
			city: 'd-iveauywljfifd',
			state: 'cetuqnbvmbkqwlt',
			street: 'wyttcnyvxpetrsa',
		},
		birthday: new Date('2089-04-19T20:26:28.411Z'),
		name: 'barmftzlcngaynw',
		pets: [
			{
				breed: 'fbmiabahyvsy-vm',
				name: 'bonzm-sjnglvkbb',
			},
			{
				breed: 'vifsztjznktjkve',
				name: 'wqbjuehl-trb-ai',
			},
			{
				breed: 'cq-jcmhccaduqmk',
				name: 'brrvbrgzmjhttzh',
			},
		],
		totalVisits: 63,
	},
	// #endregion output
);

test('generates a person', () => {
	expect(person).toMatchInlineSnapshot(`
		{
		  "address": {
		    "city": "d-iveauywljfifd",
		    "state": "cetuqnbvmbkqwlt",
		    "street": "wyttcnyvxpetrsa",
		  },
		  "birthday": 2089-04-19T20:26:28.411Z,
		  "name": "barmftzlcngaynw",
		  "pets": [
		    {
		      "breed": "fbmiabahyvsy-vm",
		      "name": "bonzm-sjnglvkbb",
		    },
		    {
		      "breed": "vifsztjznktjkve",
		      "name": "wqbjuehl-trb-ai",
		    },
		    {
		      "breed": "cq-jcmhccaduqmk",
		      "name": "brrvbrgzmjhttzh",
		    },
		  ],
		  "totalVisits": 63,
		}
	`);
	expect(person).toEqual(output);
});
