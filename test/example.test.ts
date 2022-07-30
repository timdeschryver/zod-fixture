import { create, numberRandomizeCustomization } from '../src';
import { expect, test } from 'vitest';
import type { Customization } from '../src';
import { z } from 'zod';

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

	expect(() => create(PersonSchema)).not.toThrow();
});

test('creates a fixture with customizations', () => {
	const numberCustomization = numberRandomizeCustomization(0, 5);
	const addressCustomization: Customization = {
		condition: ({ type, propertName }) =>
			type === 'object' && propertName === 'address',
		generator: () => {
			return {
				street: 'My Street',
				city: 'My City',
				state: 'My State',
			};
		},
	};

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

	expect(() =>
		create(PersonSchema, {
			defaultLength: 1,
			customizations: [numberCustomization, addressCustomization],
		}),
	).not.toThrow();
});
