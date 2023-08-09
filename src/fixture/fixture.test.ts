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

	const pxSchema = z.custom<`${number}px`>((val) => {
		return /^\d+px$/.test(val as string);
	});
	const CustomSchemaGenerator = Generator({
		schema: pxSchema,
		output: () => '100px',
	});

	class InstanceOfClass {}
	const instanceOfSchema = z.instanceof(InstanceOfClass);
	const InstanceOfSchemaGenerator = Generator({
		schema: instanceOfSchema,
		output: () => new InstanceOfClass(),
	});

	const errorSchema = z.instanceof(Error);
	const ErrorGenerator = Generator({
		schema: errorSchema,
		output: () => new Error(),
	});

	const schemaWithEverything = z.object({
		default: z.string().default('default'),
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
		unknown: z.unknown(),
		// this is by design, see the never generator for more info
		// never: z.never(),
		literal: z.literal('literal'),
		string_max: z.string().max(5),
		string_min: z.string().min(5),
		string_length: z.string().length(5),
		string_email: z.string().email(),
		string_url: z.string().url(),
		string_emoji: z.string().emoji(),
		string_uuid: z.string().uuid(),
		string_cuid: z.string().cuid(),
		string_cuid2: z.string().cuid2(),
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
			z.object({ status: z.literal('failed'), error: errorSchema }),
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
		custom: pxSchema,
		instanceof: instanceOfSchema,
	});

	const fixture = new Fixture().extend([
		CustomSchemaGenerator,
		InstanceOfSchemaGenerator,
		ErrorGenerator,
	]);

	expect(fixture).toReasonablySatisfy(schemaWithEverything);
	expect(fixture.fromSchema(schemaWithEverything, { seed: 1 }))
		.toMatchInlineSnapshot(`
			{
			  "any": "ZodAny",
			  "array": [
			    "-bwuginfq-wyeua",
			    "bbnvqupmio-cpdk",
			    "ofuysmhdbujfrcf",
			  ],
			  "array_length": [
			    "xaihsmmjkglakoi",
			    "qple-lssfhlajfv",
			    "xzyvrnhagixooxv",
			    "pctboluapbmvjrb",
			    "ktcg-behvxxbsrp",
			  ],
			  "array_max": [
			    "jvphdnzqiazqflg",
			    "xigywpoefvpqbba",
			    "bskypax-vkg-cqe",
			    "fplqjhspsucxauv",
			  ],
			  "array_min": [
			    "bttoutyezsalgtq",
			    "zkzypfyarzkhneq",
			    "omzvyjkq-aejdcd",
			    "naamzzwjamecind",
			    "vojhzjpyxgway-m",
			  ],
			  "array_nonempty": [
			    "ebjhcvdfzrpowyq",
			  ],
			  "bigint": 7n,
			  "bigint_gt": 39n,
			  "bigint_gte": 9n,
			  "bigint_lt": -84n,
			  "bigint_lte": -88n,
			  "bigint_multipleOf": 55n,
			  "bigint_negative": -9n,
			  "bigint_nonnegative": 4n,
			  "bigint_nonpositive": -90n,
			  "bigint_positive": 93n,
			  "boolean": false,
			  "const_enum": "apple",
			  "custom": "100px",
			  "date": 1984-04-04T07:51:12.441Z,
			  "default": "default",
			  "enum": "Salmon",
			  "function": [Function],
			  "instanceof": InstanceOfClass {},
			  "intersection": {
			    "name": "ztvgaptdmkzcfnh",
			    "role": "cmljcwrbvksmutj",
			  },
			  "intersection_and": {
			    "name": "whlwwrqadtcqasb",
			    "role": "mpdjazu-kkuwm-m",
			  },
			  "literal": "literal",
			  "map": Map {
			    "ool--rf--orovdm" => -28.858965868130326,
			    "aoepuyaijtxvsms" => -2.4851254653185606,
			    "wloph-nfhgghruy" => -8.604933554306626,
			  },
			  "nan": NaN,
			  "native_enum": 1,
			  "null": null,
			  "nullable": null,
			  "number": 87.1078145224601,
			  "number_finite": -14.32351809926331,
			  "number_gt": 73.43481058767065,
			  "number_gte": 81.67499317205511,
			  "number_int": -15,
			  "number_lt": -36.25339860841632,
			  "number_lte": -59.274632218293846,
			  "number_multipleOf": 10,
			  "number_negative": -26.03495768457651,
			  "number_nonnegative": 75.18729693256319,
			  "number_nonpositive": -57.218736479990184,
			  "number_positive": 86.49064341560006,
			  "number_safe": -6549040414064640,
			  "object": {
			    "name": "dbh-jphfbgeuefz",
			  },
			  "optional": undefined,
			  "promise": Promise {},
			  "record": {
			    "dfboyvtaiikxcwj": 7.688118563964963,
			    "tapu-tihiggrsjv": 59.31773544289172,
			    "xqzfwqxicbrtsuq": -18.73913980089128,
			  },
			  "record_keytype": {
			    "-": -71.39883344061673,
			    "q": 56.549883307889104,
			  },
			  "set": Set {
			    -88.61411320976913,
			    75.97062094137073,
			    1.7032479867339134,
			  },
			  "set_max": Set {
			    -82.27674816735089,
			    68.76808633096516,
			    -66.86207195743918,
			    -23.796775052323937,
			  },
			  "set_min": Set {
			    -39.42573582753539,
			    -40.53372307680547,
			    -2.19853981398046,
			    -94.47879707440734,
			    -59.265134297311306,
			  },
			  "set_nonempty": Set {
			    -57.60796754620969,
			    44.99602420255542,
			  },
			  "set_size": Set {
			    49.971662322059274,
			    57.51620144583285,
			    2.228294825181365,
			    80.72037338279188,
			    8.190361689776182,
			  },
			  "string": "tzadi-dgckfkjsk",
			  "string_cuid": "cw9x0kkq20000cblmdk6keesa",
			  "string_cuid2": "c7h6jkrvbuuwf8vjzidto8yr",
			  "string_datetime": "1930-09-28T00:53:21.588Z",
			  "string_datetimeOffset": "2016-04-21T06:04:05.796Z",
			  "string_datetimePrecision": "1965-08-27T23:34:22.007Z",
			  "string_email": "rando@email.com",
			  "string_emoji": "😅🙆😵😈😯😢😶🙌😡😫😐😷😗😙😌",
			  "string_endsWith": "mjpzlkguyupiabc",
			  "string_enum": 3,
			  "string_includes": "abcpurtdxsqrujj",
			  "string_ip": "24e:e2cd:b583:5b76:787b:e895:c3bc:9f94",
			  "string_ipv4": "120.5.69.238",
			  "string_ipv6": "d4e9:b0de:8d23:ff50:11f0:2c1e:78f4:231b",
			  "string_length": "ldzfv",
			  "string_max": "oflxg",
			  "string_min": "osylm",
			  "string_regex": "abc",
			  "string_startsWith": "abculx-arnqbdvz",
			  "string_trim": "zfsmbgunufybtod",
			  "string_ulid": "01H1RH1N4GSY0JWWH4E4WSCCH5",
			  "string_url": "https://cupidatat.com",
			  "string_uuid": "b468ebfa-1c47-4c33-8aa5-f452c996c6a8",
			  "symbol": Symbol(ad),
			  "toLowerCase": "akacangcxhogo-w",
			  "toUpperCase": "DGHCPP-LPJAVVHG",
			  "tuples": [
			    "eomyjmgwpwidyoy",
			    -6.582936970517039,
			    {
			      "pointsScored": -48.576340451836586,
			    },
			  ],
			  "undefined": undefined,
			  "union_discriminated": {
			    "data": "cynvmfefqsoernd",
			    "status": "success",
			  },
			  "unions": "lfmnitafngswble",
			  "unions_or": 21.02064723148942,
			  "unknown": "ZodUnknown",
			  "void": undefined,
			}
		`);
});
