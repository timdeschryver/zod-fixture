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
			    "cfcuebjhcvdfzrp",
			    "wyqhibttoutyezs",
			    "lgtquzkzypfyarz",
			  ],
			  "array_length": [
			    "rpfeomyjmgwpwid",
			    "oymgfclfmnitafn",
			    "swbleqqgicynvmf",
			    "fqsoernd-udfboy",
			    "taiikxcwjoaxqzf",
			  ],
			  "array_max": [
			    "uvsyxaihsmmjkgl",
			    "koidqple-lssfhl",
			    "jfvaxzyvrnhagix",
			    "oxvepctboluapbm",
			    "jrbuktcg-behvxx",
			  ],
			  "array_min": [
			    "ndxvojhzjpyxgwa",
			    "-mlojvphdnzqiaz",
			    "flgvxigywpoefvp",
			    "bbalbskypax-vkg",
			    "cqewfplqjhspsuc",
			  ],
			  "array_nonempty": [
			    "neqaomzvyjkq-ae",
			    "dcdsnaamzzwjame",
			  ],
			  "bigint": 11n,
			  "bigint_gt": 5n,
			  "bigint_gte": 16n,
			  "bigint_lt": -93n,
			  "bigint_lte": -70n,
			  "bigint_multipleOf": -60n,
			  "bigint_negative": -44n,
			  "bigint_nonnegative": 36n,
			  "bigint_nonpositive": -73n,
			  "bigint_positive": 96n,
			  "boolean": true,
			  "const_enum": 3,
			  "custom": "100px",
			  "date": 1986-07-27T20:58:44.531Z,
			  "default": "tzadi-dgckfkjsk",
			  "enum": "Salmon",
			  "function": [Function],
			  "instanceof": InstanceOfClass {},
			  "intersection": {
			    "name": "m-mpmsmcv-kvy-b",
			    "role": "ubdtqsaqocahzuy",
			  },
			  "intersection_and": {
			    "name": "vnytdceqfwqsyo-",
			    "role": "tuthy-kpgrendyv",
			  },
			  "literal": "literal",
			  "map": Map {
			    "afqcweknuvnyofz" => 47.62619361281395,
			    "gaptdmkzcfnhscm" => -14.276233920827508,
			    "cwrbvksmutjywhl" => 63.55367777869105,
			  },
			  "nan": NaN,
			  "native_enum": 0,
			  "null": null,
			  "nullable": "euarbbnvqupmio-",
			  "number": -8.55903816409409,
			  "number_finite": 11.943395854905248,
			  "number_gt": 17.406284402124584,
			  "number_gte": 94.03308096341789,
			  "number_int": -79,
			  "number_lt": -95.36660502664745,
			  "number_lte": -3.7769633170682937,
			  "number_multipleOf": -95,
			  "number_negative": -38.98343466059305,
			  "number_nonnegative": 22.570933867245913,
			  "number_nonpositive": -28.701101569458842,
			  "number_positive": 78.4138878043741,
			  "number_safe": 2780049921015807,
			  "object": {
			    "name": "pdknofuysmhdbuj",
			  },
			  "optional": "fzpk-bwuginfq-w",
			  "promise": Promise {},
			  "record": {
			    "fwloph-nfhgghru": 84.22671579755843,
			    "xaoepuyaijtxvsm": 38.18842824548483,
			    "yool--rf--orovd": -8.369824336841702,
			  },
			  "record_keytype": {
			    "b": 75.97062094137073,
			    "m": -57.60796754620969,
			    "v": -39.42573582753539,
			  },
			  "set": Set {
			    31.2631718814373,
			    25.299231754615903,
			    -97.743936534971,
			  },
			  "set_max": Set {
			    14.704195782542229,
			    -77.33161500655115,
			    -27.796505857259035,
			    -94.44333156570792,
			  },
			  "set_min": Set {
			    20.698929484933615,
			    -96.33347224444151,
			    36.0038292594254,
			    -86.6550013422966,
			    16.79195766337216,
			  },
			  "set_nonempty": Set {
			    47.070738999173045,
			  },
			  "set_size": Set {
			    50.972295785322785,
			    97.388562746346,
			    -21.029904345050454,
			    -22.572914510965347,
			    49.38769889995456,
			  },
			  "string": "owlisoflxgaosyl",
			  "string_cuid": "ck6keesad0000xfxgrvbuuwf8",
			  "string_cuid2": "pzidto8yrotb1tbxfs28bv56",
			  "string_datetime": "2086-10-24T18:36:58.892Z",
			  "string_datetimeOffset": "2038-11-13T19:34:21.916Z",
			  "string_datetimePrecision": "2067-03-03T01:09:13.168Z",
			  "string_email": "rando@email.com",
			  "string_emoji": "😷😾🙂😡😂😃😼😲🙏😵😼😘😗😤😿",
			  "string_endsWith": "eipoaxtjmyuqabc",
			  "string_enum": "apple",
			  "string_includes": "abcyulx-arnqbdv",
			  "string_ip": "ff50:11f0:2c1e:78f4:231b:be25:eebe:3124",
			  "string_ipv4": "178.119.17.59",
			  "string_ipv6": "c166:821c:c0fe:3564:ec4b:c9f:b626:84d4",
			  "string_length": "ywcwb",
			  "string_max": "fvvt-",
			  "string_min": "icsnx",
			  "string_regex": "abc",
			  "string_startsWith": "abcpzlkguyupiau",
			  "string_trim": "eakacangcxhogo-",
			  "string_ulid": "014E4WSCCH5MXBBJRMQ4WPKMRB",
			  "string_url": "https://aliqua..com",
			  "string_uuid": "6872dd83-150d-4189-b7c2-76629a275140",
			  "symbol": Symbol(do),
			  "toLowerCase": "hdghcpp-lpjavvh",
			  "toUpperCase": "TVQKLXUULPLDJBE",
			  "tuples": [
			    "qxicbrtsuqkvtap",
			    54.04774583876133,
			    {
			      "pointsScored": 93.91290135681629,
			    },
			  ],
			  "undefined": undefined,
			  "union_discriminated": {
			    "error": [Error],
			    "status": "failed",
			  },
			  "unions": -39.22431445680559,
			  "unions_or": "ggrsjvvnmqvb-mi",
			  "unknown": "ZodUnknown",
			  "void": undefined,
			}
		`);
});
