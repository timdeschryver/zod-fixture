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
			city: '-iveauywljfifdx',
			state: 'etuqnbvmbkqwlty',
			street: 'yttcnyvxpetrsa-',
		},
		birthday: new Date('1918-08-28T15:26:17.353Z'),
		name: 'armftzlcngaynwz',
		pets: [
			{
				breed: 'bmiabahyvsy-vmp',
				name: 'onzm-sjnglvkbbj',
			},
			{
				breed: 'ifsztjznktjkveu',
				name: 'qbjuehl-trb-aiu',
			},
			{
				breed: 'q-jcmhccaduqmkq',
				name: 'rrvbrgzmjhttzhj',
			},
		],
		totalVisits: 43,
	}
	// #endregion output
);

test('generates a person', () => {
	expect(person).toMatchInlineSnapshot(`
		{
		  "address": {
		    "city": "-iveauywljfifdx",
		    "state": "etuqnbvmbkqwlty",
		    "street": "yttcnyvxpetrsa-",
		  },
		  "birthday": 1918-08-28T15:26:17.353Z,
		  "name": "armftzlcngaynwz",
		  "pets": [
		    {
		      "breed": "bmiabahyvsy-vmp",
		      "name": "onzm-sjnglvkbbj",
		    },
		    {
		      "breed": "ifsztjznktjkveu",
		      "name": "qbjuehl-trb-aiu",
		    },
		    {
		      "breed": "q-jcmhccaduqmkq",
		      "name": "rrvbrgzmjhttzhj",
		    },
		  ],
		  "totalVisits": 43,
		}
	`);
	expect(person).toEqual(output);
});
