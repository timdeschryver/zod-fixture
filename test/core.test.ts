import { describe, expect, test } from 'vitest';
import { ZodNumber, z } from 'zod';
import { Core, Generator } from '../src';
import defaultGenerators from '../src/generators/default';
import { NumberGenerator } from '../src/generators/default/number';
import { ObjectGenerator } from '../src/generators/default/object';
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

	describe('order of generators', () => {
		const FooNumberGenerator = Generator({
			schema: ZodNumber,
			matches: (x) => x.context?.path?.includes('foo'),
			output: () => {
				return 4;
			},
		});

		test(`test one`, () => {
			const core = new Core().register([
				ObjectGenerator,
				FooNumberGenerator,
				NumberGenerator,
			]);

			const result = core.generate(
				z.object({
					foo: z.number(),
					other: z.number(),
				})
			);

			expect(result.foo).toBe(4);
		});

		test.fails(`test two`, () => {
			const core = new Core().register([
				ObjectGenerator,
				NumberGenerator,
				FooNumberGenerator,
			]);

			const result = core.generate(
				z.object({
					foo: z.number(),
					other: z.number(),
				})
			);

			expect(result.foo).toBe(4);
		});
	});
});
