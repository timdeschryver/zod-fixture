import { expect, test } from 'vitest';
import { ZodNumber, ZodObject, z } from 'zod';
import { Generator, createFixture } from 'zod-fixture';

test('generates a person using custom generators', () => {
	const addressGenerator = Generator({
		// we're interested in zod objects
		schema: ZodObject,
		// we only want to change the behavior of the address object
		filter: ({ context }) => context.path.at(0) === 'address',
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
		output: ({ core }) => core.utils.random.int({ min: 0, max: 25 }),
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

	expect(
		createFixture(PersonSchema, {
			extend: [addressGenerator, totalVisitsGenerator],
			seed: 38,
		})
	).toMatchSnapshot();
});
