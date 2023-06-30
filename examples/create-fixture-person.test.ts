import { Fixture } from '@/export';
import { expect, test } from 'vitest';
import { z } from 'zod';

test('generates a person', () => {
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

	expect(new Fixture({ seed: 11 }).from(PersonSchema)).toMatchSnapshot();
});
