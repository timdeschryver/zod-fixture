import { describe, expect, test } from 'vitest';
import { ZodNumber, z } from 'zod';
import defaultGenerators from '../generators/default';
import { NumberGenerator } from '../generators/default/number';
import { ObjectGenerator } from '../generators/default/object';
import { StringGenerator } from '../generators/default/string';
import { Core } from './core';
import { Generator } from './generator';

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
		test(`picks up the first matching generator`, () => {
			const FooNumberGenerator = Generator({
				schema: ZodNumber,
				matches: (x) => x.context?.path?.includes('foo'),
				output: () => {
					return 4;
				},
			});

			const core = new Core().register([
				ObjectGenerator,
				FooNumberGenerator,
				NumberGenerator,
			]);

			const schema = z.object({
				foo: z.number(),
				other: z.number(),
			});
			const result = core.generate(schema);
			type schemaType = z.infer<typeof schema>;

			expect((result as schemaType).foo).toBe(4);
			expect((result as schemaType).other).toBeTypeOf('number');
		});

		test(`picks up the first matching generator using register`, () => {
			const FooNumberGenerator = Generator({
				schema: ZodNumber,
				matches: (x) => x.context?.path?.includes('foo'),
				output: () => {
					return 4;
				},
			});

			const core = new Core().register([ObjectGenerator]);
			core.register(FooNumberGenerator);
			core.register(NumberGenerator);

			const schema = z.object({
				foo: z.number(),
				other: z.number(),
			});
			const result = core.generate(schema);
			type schemaType = z.infer<typeof schema>;

			expect((result as schemaType).foo).toBe(4);
			expect((result as schemaType).other).toBeTypeOf('number');
		});
	});
});
