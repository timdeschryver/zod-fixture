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
		    "io-cpdknofuysmh",
		    "bujfrcfcuebjhcv",
		    "fzrpowyqhibttou",
		  ],
		  "array_length": [
		    "vxxbsrpfeomyjmg",
		    "pwidyoymgfclfmn",
		    "tafngswbleqqgic",
		    "nvmfefqsoernd-u",
		    "fboyvtaiikxcwjo",
		  ],
		  "array_max": [
		    "sucxauvsyxaihsm",
		    "jkglakoidqple-l",
		    "sfhlajfvaxzyvrn",
		    "agixooxvepctbol",
		    "apbmvjrbuktcg-b",
		  ],
		  "array_min": [
		    "amecindxvojhzjp",
		    "xgway-mlojvphdn",
		    "qiazqflgvxigywp",
		    "efvpqbbalbskypa",
		    "-vkg-cqewfplqjh",
		  ],
		  "array_nonempty": [
		    "ezsalgtquzkzypf",
		    "arzkhneqaomzvyj",
		    "q-aejdcdsnaamzz",
		  ],
		  "bigint": 87n,
		  "bigint_gt": 76n,
		  "bigint_gte": 75n,
		  "bigint_lt": -56n,
		  "bigint_lte": -42n,
		  "bigint_multipleOf": -70n,
		  "bigint_negative": -64n,
		  "bigint_nonnegative": 13n,
		  "bigint_nonpositive": -95n,
		  "bigint_positive": 42n,
		  "boolean": true,
		  "const_enum": 3,
		  "custom": "100px",
		  "date": 2008-04-20T03:39:56.576Z,
		  "enum": "Salmon",
		  "function": [Function],
		  "instanceof": InstanceOfClass {},
		  "intersection": {
		    "name": "tcqasbpmpdjazu-",
		    "role": "kuwm-mpmsmcv-kv",
		  },
		  "intersection_and": {
		    "name": "-brubdtqsaqocah",
		    "role": "uyyvnytdceqfwqs",
		  },
		  "literal": "literal",
		  "map": Map {
		    "fhgghruymfbxnmf" => 44.99602420255542,
		    "iinafqcweknuvny" => 8.190361689776182,
		    "ztvgaptdmkzcfnh" => 38.88137047179043,
		  },
		  "nan": NaN,
		  "native_enum": 1,
		  "null": null,
		  "nullable": "bgeuefzpk-bwugi",
		  "number": -20.646506268531084,
		  "number_finite": -14.618035266175866,
		  "number_gt": 40.57726460695267,
		  "number_gte": 6.771492556435987,
		  "number_int": -42,
		  "number_lt": -15.448522949591279,
		  "number_lte": -15.933569326298311,
		  "number_multipleOf": -20,
		  "number_negative": -20.096586062805727,
		  "number_nonnegative": 71.73916019964963,
		  "number_nonpositive": -38.705190969631076,
		  "number_positive": 24.064453065162525,
		  "number_safe": 6548987809103871,
		  "object": {
		    "name": "fq-wyeuarbbnvqu",
		  },
		  "optional": "vgqtapradbh-jph",
		  "promise": Promise {},
		  "record": {
		    "-djyool--rf--or": 5.285186041146517,
		    "dmjxaoepuyaijtx": 61.04716784320772,
		    "higgrsjvvnmqvb-": -10.780098894611001,
		  },
		  "record_keytype": {
		    "p": -46.023741737008095,
		    "s": -2.4851254653185606,
		    "w": -11.619144352152944,
		  },
		  "set": Set {
		    -8.604418532922864,
		    -14.276233920827508,
		    -27.745057549327612,
		  },
		  "set_max": Set {
		    47.146423533558846,
		    -31.509176827967167,
		    81.92738965153694,
		    69.17029698379338,
		    -44.51890685595572,
		  },
		  "set_min": Set {
		    -90.83769624121487,
		    60.59264736250043,
		    -22.434442210942507,
		    39.3600991461426,
		    -8.295364351943135,
		  },
		  "set_nonempty": Set {
		    63.20150108076632,
		  },
		  "set_size": Set {
		    63.55367777869105,
		    64.80197310447693,
		    31.2631718814373,
		    25.299231754615903,
		    -97.743936534971,
		  },
		  "string": "-tzadi-dgckfkjs",
		  "string_cuid": "cb1w9x0kk0000ufcbq6dk6kee",
		  "string_cuid2": "ndy7h6jkrvbuuwf8vjzidto8",
		  "string_datetime": "2055-04-27T02:22:10.297Z",
		  "string_datetimeOffset": "1930-09-28T00:53:21.588Z",
		  "string_datetimePrecision": "2024-01-17T11:02:02.449Z",
		  "string_email": "rando@email.com",
		  "string_emoji": "😖😎😅🙆😵😈😯😢😶🙌😡😫😐😷😗",
		  "string_endsWith": "zbmjpzlkguyuabc",
		  "string_enum": "apple",
		  "string_includes": "abcjjpurtdxsqru",
		  "string_ip": "148.135.3.226",
		  "string_ipv4": "181.92.121.232",
		  "string_ipv6": "c3bc:9f94:77a7:40c:44dd:edef:d4e9:b0de",
		  "string_length": "mpldz",
		  "string_max": "isofl",
		  "string_min": "gaosy",
		  "string_regex": "abc",
		  "string_startsWith": "abcjyulx-arnqbd",
		  "string_trim": "-bemduzfsmbgunu",
		  "string_ulid": "01FDH1RH1N4GSY0JWWH4E4WSCC",
		  "string_url": "https://ut.com",
		  "string_uuid": "0f1a5c05-2cf1-42b4-8ebf-91c4788c3370",
		  "symbol": Symbol(sunt),
		  "toLowerCase": "ybtodeakacangcx",
		  "toUpperCase": "OGO-WHDGHCPP-LP",
		  "tuples": [
		    "xqzfwqxicbrtsuq",
		    -18.73913980089128,
		    {
		      "pointsScored": 59.92305250838399,
		    },
		  ],
		  "undefined": undefined,
		  "union_discriminated": {
		    "error": [Error],
		    "status": "failed",
		  },
		  "unions": -93.08575564064085,
		  "unions_or": 54.04774583876133,
		  "unknown": "ZodUnknown",
		  "void": undefined,
		}
	`);
});
