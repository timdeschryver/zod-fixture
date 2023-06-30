import { expect, test } from 'vitest';
import { ZodNumber, ZodObject, z } from 'zod';
import { Fixture, Generator } from 'zod-fixture';

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
		totalVisits: z.number(),
	});

	expect(
		new Fixture({ seed: 38 })
			.extend([addressGenerator, totalVisitsGenerator])
			.from(PersonSchema)
	).toMatchSnapshot();
});
