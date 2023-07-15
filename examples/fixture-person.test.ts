import { expect, test } from 'vitest';
// #region example
import { z } from 'zod';
import { createFixture } from 'zod-fixture';

const PersonSchema = z.object({
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

const person = createFixture(PersonSchema, { seed: 11 });
// #endregion example

const output = Object.assign(
	// #region output
	{
		address: {
			city: 'bonzm-sjnglvkbb',
			state: 'fbmiabahyvsy-vm',
			street: 'etuqnbvmbkqwlty',
		},
		birthday: new Date('2073-08-30T03:26:04.735Z'),
		name: 'd-iveauywljfifd',
		pets: [
			{
				breed: 'ifsztjznktjkveu',
				name: 'qbjuehl-trb-aiu',
			},
			{
				breed: 'q-jcmhccaduqmkq',
				name: 'rrvbrgzmjhttzhj',
			},
			{
				breed: 'rgsnffunjalqicp',
				name: 'tolkjleyvtwitax',
			},
		],
		totalVisits: 21,
	}
	// #endregion output
);

test('generates a person', () => {
	expect(person).toMatchInlineSnapshot(`
		{
		  "address": {
		    "city": "bonzm-sjnglvkbb",
		    "state": "fbmiabahyvsy-vm",
		    "street": "etuqnbvmbkqwlty",
		  },
		  "birthday": 2073-08-30T03:26:04.735Z,
		  "name": "d-iveauywljfifd",
		  "pets": [
		    {
		      "breed": "ifsztjznktjkveu",
		      "name": "qbjuehl-trb-aiu",
		    },
		    {
		      "breed": "q-jcmhccaduqmkq",
		      "name": "rrvbrgzmjhttzhj",
		    },
		    {
		      "breed": "rgsnffunjalqicp",
		      "name": "tolkjleyvtwitax",
		    },
		  ],
		  "totalVisits": 21,
		}
	`);
	expect(person).toEqual(output);
});
