import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { Core } from '../src';
import defaultGenerators from '../src/generators/default';
import { StringGenerator } from '../src/generators/default/string';

describe('core', () => {
	test('throws on invalid schema type', () => {
		const core = new Core();
		const input = z.string();
		expect(() => core.generate(input)).toThrowError(input._def.typeName);
	});

	test('creates a fixture', () => {
		const core = new Core().register(defaultGenerators);
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

		expect(() => core.generate(PersonSchema)).not.toThrow();
	});

	test('throws when schema missing', () => {
        const generators = [...defaultGenerators].filter((g) => g !== StringGenerator);
		const core = new Core().register(generators);
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

		expect(() => core.generate(PersonSchema)).toThrow(/No generator found for ZodString/i);
	});
});
