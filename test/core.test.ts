import { describe, expect, test } from 'vitest';
import { ZodNumber, z } from 'zod';
import createFixture, { Core, Generator } from '../src';
import defaultGenerators from '../src/generators/default';
import { StringGenerator } from '../src/generators/default/string';

describe('core', () => {
	test('throws on invalid schema type', () => {
		const core = new Core();
		const input = z.string();
		expect(() => core.generate(input)).toThrowError(input._def.typeName);
	});

	test('throws when schema missing', () => {
		const generators = [...defaultGenerators].filter(
			(g) => g !== StringGenerator
		);
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

		expect(() => core.generate(PersonSchema)).toThrow(
			/No generator found for ZodString/i
		);
	});
});

describe('createFixture', () => {
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

		expect(() => createFixture(PersonSchema)).not.toThrow();
	});

	describe('order of generators', () => {
		const CustomGenerators = [
			Generator({
				schema: ZodNumber,
				matches: ({ context }) => context?.path?.includes('foo'),
				output: () => 'A string cannot collide with a number',
			}),
		];

		test(`test one`, () => {
			const result = createFixture(
				z.object({
					foo: z.number(),
					other: z.number(),
				}),
				{ extend: CustomGenerators }
			);

			expect(result.foo).toBe('A string cannot collide with a number');
		});
	});
});
