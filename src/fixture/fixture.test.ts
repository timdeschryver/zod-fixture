import { ZodString } from '@/internal/zod';
import { Generator } from '@/transformer/generator';
import { expect, test } from 'vitest';
import { z } from 'zod';
import { Fixture, createFixture } from './fixture';

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

test('creates a fixture using a class instance', () => {
	const result = new Fixture().fromSchema(PersonSchema);
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

test('creates a fixture using createFixture', () => {
	const result = createFixture(PersonSchema);
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
	const nameGenerator = Generator({
		schema: ZodString,
		filter: ({ context }) => context.path.includes('name'),
		output: () => 'Fixed Name',
	});

	const result = new Fixture().extend(nameGenerator).fromSchema(PersonSchema);

	expect(result.name).toBe('Fixed Name');
	expect(result.birthday).toBeInstanceOf(Date);
	expect(result.address).toBeTypeOf('object');
	expect(result.address.street).toBeTypeOf('string');
	expect(result.address.street).not.toBe('Fixed Name');
	expect(result.address.city).toBeTypeOf('string');
	expect(result.address.state).toBeTypeOf('string');
	expect(result.pets).toBeInstanceOf(Array);
	expect(result.pets[0]).toBeTypeOf('object');
	expect(result.pets[0]?.name).toBeTypeOf('string');
	expect(result.pets[0]?.breed).toBeTypeOf('string');
	expect(result.totalVisits).toBeTypeOf('number');
});

test(`fixture has all the zod types`, () => {
	enum Fruits {
		Apple,
		Banana,
	}
	enum StringFruits {
		Apple = 'apple',
		Banana = 'banana',
		Cantaloupe = 3,
	}
	const constFruits = {
		Apple: 'apple',
		Banana: 'banana',
		Cantaloupe: 3,
	} as const;
	const Person = z.object({
		name: z.string(),
	});

	const Employee = z.object({
		role: z.string(),
	});

	class InstanceOfClass {}

	const instanceOfSchema = z.instanceof(InstanceOfClass);

	const schemaWithEverything = z.object({
		string: z.string(),
		number: z.number(),
		bigint: z.bigint(),
		boolean: z.boolean(),
		date: z.date(),
		symbol: z.symbol(),
		undefined: z.undefined(),
		null: z.null(),
		void: z.void(),
		any: z.any(),
		// TODO: add this?
		// unknown: z.unknown(),
		never: z.never(),
		literal: z.literal('literal'),
		string_max: z.string().max(5),
		string_min: z.string().min(5),
		string_length: z.string().length(5),
		string_email: z.string().email(),
		string_url: z.string().url(),
		string_emoji: z.string().emoji(),
		string_uuid: z.string().uuid(),
		// this is by design
		// we don't support cuid in favor of cuid2
		// string_cuid: z.string().cuid()
		// TODO: the seeding doesn't work for this?
		string_cuid2: z.string().cuid2(),
		// TODO: can we bind this to our seed?
		string_ulid: z.string().ulid(),
		string_regex: z.string().regex(/abc/),
		string_includes: z.string().includes('abc'),
		string_startsWith: z.string().startsWith('abc'),
		string_endsWith: z.string().endsWith('abc'),
		string_datetime: z.string().datetime(),
		string_datetimePrecision: z.string().datetime({ precision: 3 }),
		string_datetimeOffset: z.string().datetime({ offset: true }),
		string_ip: z.string().ip(),
		string_ipv4: z.string().ip({ version: 'v4' }),
		string_ipv6: z.string().ip({ version: 'v6' }),
		string_trim: z.string().trim(),
		toLowerCase: z.string().toLowerCase(),
		toUpperCase: z.string().toUpperCase(),
		number_gt: z.number().gt(5),
		number_gte: z.number().gte(5),
		number_lt: z.number().lt(5),
		number_lte: z.number().lte(5),
		number_int: z.number().int(),
		number_positive: z.number().positive(),
		number_nonnegative: z.number().nonnegative(),
		number_negative: z.number().negative(),
		number_nonpositive: z.number().nonpositive(),
		number_multipleOf: z.number().multipleOf(5),
		number_finite: z.number().finite(),
		number_safe: z.number().safe(),
		bigint_gt: z.bigint().gt(5n),
		bigint_gte: z.bigint().gte(5n),
		bigint_lt: z.bigint().lt(5n),
		bigint_lte: z.bigint().lte(5n),
		bigint_positive: z.bigint().positive(),
		bigint_nonnegative: z.bigint().nonnegative(),
		bigint_negative: z.bigint().negative(),
		bigint_nonpositive: z.bigint().nonpositive(),
		bigint_multipleOf: z.bigint().multipleOf(5n),
		nan: z.nan(),
		enum: z.enum(['Salmon', 'Tuna', 'Trout']),
		native_enum: z.nativeEnum(Fruits),
		string_enum: z.nativeEnum(StringFruits),
		const_enum: z.nativeEnum(constFruits),
		optional: z.optional(z.string()),
		nullable: z.nullable(z.string()),
		object: z.object({ name: z.string() }),
		array: z.array(z.string()),
		array_nonempty: z.string().array().nonempty(),
		array_min: z.string().array().min(5),
		array_max: z.string().array().max(5),
		array_length: z.string().array().length(5),
		tuples: z.tuple([
			z.string(),
			z.number(),
			z.object({
				pointsScored: z.number(),
			}),
		]),
		unions: z.union([z.string(), z.number()]),
		unions_or: z.string().or(z.number()),
		union_discriminated: z.discriminatedUnion('status', [
			z.object({ status: z.literal('success'), data: z.string() }),
			z.object({ status: z.literal('failed'), error: z.instanceof(Error) }),
		]),
		record: z.record(z.number()),
		record_keytype: z.record(z.string().min(1), z.number()),
		map: z.map(z.string(), z.number()),
		set: z.set(z.number()),
		set_nonempty: z.set(z.number()).nonempty(),
		set_min: z.set(z.number()).min(5),
		set_max: z.set(z.number()).max(5),
		set_size: z.set(z.number()).size(5),
		intersection: z.intersection(Person, Employee),
		intersection_and: Person.and(Employee),
		promise: z.promise(z.number()),
		function: z.function(),
		custom: z.custom<`${number}px`>((val) => /^\d+px$/.test(val as string)),
		instanceof: instanceOfSchema,
	});

	const fixture = new Fixture().extend(
		Generator({
			schema: instanceOfSchema,
			output: () => new InstanceOfClass(),
		})
	);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const result = fixture.fromSchema(schemaWithEverything, { seed: 1 });
	// TODO: this should parse
	// schemaWithEverything.parse(result);
});
