import { Generator } from '@/transformer/generator';
import { expect, test } from 'vitest';
import { ZodNumber, z } from 'zod';
import { Fixture } from './fixture';

test('creates a fixture', () => {
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

	const result = new Fixture().from(PersonSchema);
	expect(result.name).toBeTypeOf('string');
	expect(result.birthday).toBeInstanceOf(Date);
	expect(result.address).toBeTypeOf('object');
	expect(result.address.street).toBeTypeOf('string');
	expect(result.address.city).toBeTypeOf('string');
	expect(result.address.state).toBeTypeOf('string');
	expect(result.pets).toBeInstanceOf(Array);
	expect(result.pets[0]).toBeTypeOf('object');
	expect(result.pets[0]?.name).toBeTypeOf('string');
	expect(result.pets[0]?.breed).toBeTypeOf('string');
	expect(result.totalVisits).toBeTypeOf('number');
});

test(`priotizes generators via extend`, () => {
	const FooNumberGenerator = Generator({
		schema: ZodNumber,
		filter: ({ context }) => context?.path?.includes('foo'),
		output: () => 4,
	});

	const result = new Fixture().extend(FooNumberGenerator).from(
		z.object({
			foo: z.number(),
			other: z.number(),
		})
	);

	expect(result.foo).toBe(4);
	expect(result.other).toBeTypeOf('number');
});