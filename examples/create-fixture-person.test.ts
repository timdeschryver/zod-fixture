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
	totalVisits: z.number(),
});

const person = createFixture(PersonSchema, { seed: 11 });
// #endregion example

const output = Object.assign(
	// #region output
	{
		address: {
			city: '43K>5SG250E',
			state: 'kbszkSZm^3Kg<CPyfa4z1HikF',
			street: 'oQes]5YUwRzbITAPk',
		},
		birthday: new Date('1980-09-26T06:36:51.341Z'),
		name: '8zGj;1humNI>G?8p6;ej\\T4jS3',
		pets: [
			{
				breed: 'RIEgfwDI7]yK6RE581:h]QM^P',
				name: 'wgIuUNfJKl;i4``l3`A',
			},
			{
				breed: 'iVI2P\\',
				name: 'YOMKN<ukgnGg1qp`CdV>',
			},
			{
				breed: 'fotFqP',
				name: '8Z?ap[eGC',
			},
		],
		totalVisits: 5544703130861567,
	}
	// #endregion output
);

test('generates a person', () => {
	expect(person).toEqual(output);
});
