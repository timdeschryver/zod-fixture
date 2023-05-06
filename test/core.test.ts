import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { Core } from '../src/core/core';
import defaultGenerators from '../src/generators/default';
import { StringGenerator } from '../src/generators/default/string';

describe('core', () => {
	test.only('throws on invalid schema type', () => {
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
        const copy = [...defaultGenerators]
        const i = copy.findIndex(StringGenerator)
        copy.splice(i, 1)

		const core = new Core().register(copy);
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

		expect(() => core.generate(PersonSchema)).toThrow(StringGenerator.prototype.schema._def.typeName);
	});
});
