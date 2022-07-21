import { expect, test } from 'vitest';
import { create } from '../src';
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
