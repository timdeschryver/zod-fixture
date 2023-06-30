import { describe, expect, test } from 'vitest';
import { ZodNumber, z } from 'zod';
import { fixtureGenerators } from '../fixtures/generators';
import { NumberGenerator } from '../fixtures/generators/number';
import { ObjectGenerator } from '../fixtures/generators/object';
import { StringGenerator } from '../fixtures/generators/string';
import { Generator } from './generator';
import { Transformer } from './transformer';

describe('core', () => {
	test('throws on invalid schema type', () => {
		const core = new Transformer();
		const input = z.string();
		expect(() => core.from(input)).toThrowError(input._def.typeName);
	});

	test('creates a fixture', () => {
		const core = new Transformer().extend(fixtureGenerators);
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

		expect(() => core.from(PersonSchema)).not.toThrow();
	});

	test('throws when schema missing', () => {
		const generators = [...fixtureGenerators].filter(
			(g) => g !== StringGenerator
		);
		const core = new Transformer().extend(generators);
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

		expect(() => core.from(PersonSchema)).toThrow(
			/No generator found for ZodString/i
		);
	});

	describe('order of generators', () => {
		test(`picks up the first matching generator`, () => {
			const FooNumberGenerator = Generator({
				schema: ZodNumber,
				filter: ({ context }) => context?.path?.includes('foo'),
				output: () => 4,
			});

			const core = new Transformer().extend([
				ObjectGenerator,
				FooNumberGenerator,
				NumberGenerator,
			]);

			const schema = z.object({
				foo: z.number(),
				other: z.number(),
			});
			const result = core.from(schema);
			type schemaType = z.infer<typeof schema>;

			expect((result as schemaType).foo).toBe(4);
			expect((result as schemaType).other).toBeTypeOf('number');
		});

		test(`picks up the first matching generator using extend`, () => {
			const FooNumberGenerator = Generator({
				schema: ZodNumber,
				filter: ({ context }) => context?.path?.includes('foo'),
				output: () => 4,
			});

			const core = new Transformer().extend([ObjectGenerator]);
			core.extend(NumberGenerator);
			core.extend(FooNumberGenerator);

			const schema = z.object({
				foo: z.number(),
				other: z.number(),
			});
			const result = core.from(schema);
			type schemaType = z.infer<typeof schema>;

			expect((result as schemaType).foo).toBe(4);
			expect((result as schemaType).other).toBeTypeOf('number');
		});
	});
});
