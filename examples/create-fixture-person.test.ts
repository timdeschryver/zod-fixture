import { expect, test } from 'vitest';
import { z } from 'zod';
import { createFixture } from 'zod-fixture';

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

	expect(
		createFixture(PersonSchema, {
			seed: 11,
		})
	).toMatchSnapshot();
});
