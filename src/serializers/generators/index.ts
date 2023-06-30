import { Generator } from '@/transformer/generator';
import {
	ZodArray,
	ZodBigInt,
	ZodBoolean,
	ZodDate,
	ZodEffects,
	ZodEnum,
	ZodFunction,
	ZodNaN,
	ZodNativeEnum,
	ZodNull,
	ZodNumber,
	ZodString,
	ZodTuple,
	ZodUndefined,
	ZodUnion,
} from 'zod';

export const BigIntGenerator = Generator({
	schema: ZodBigInt,
	output: () => ({ type: 'bigint' }),
});

export const BoolGenerator = Generator({
	schema: ZodBoolean,
	output: () => ({ type: 'boolean' }),
});

export const DateGenerator = Generator({
	schema: ZodDate,
	output: () => ({ type: 'date' }),
});

export const NumberGenerator = Generator({
	schema: ZodNumber,
	output: () => ({ type: 'number' }),
});

export const StringGenerator = Generator({
	schema: ZodString,
	output: () => ({ type: 'string' }),
});

export const EffectsGenerator = Generator({
	schema: ZodEffects,
	output: () => ({ type: 'effects' }),
});

export const EnumGenerator = Generator({
	schema: ZodEnum,
	output: ({ def }) => ({ type: 'enum', value: def.values }),
});

export const NativeEnumGenerator = Generator({
	schema: ZodNativeEnum,
	output: ({ def }) => {
		const enumerable = def.values ?? {};

		const value = Object.keys(enumerable)
			.filter((key) => Number.isNaN(Number(key)))
			.map((key) => enumerable[key]);

		return { type: 'enum', value };
	},
});

export const FunctionGenerator = Generator({
	schema: ZodFunction,
	output: () => ({ type: 'function' }),
});

export const NanGenerator = Generator({
	schema: ZodNaN,
	output: () => ({ type: 'nan' }),
});

export const NullGenerator = Generator({
	schema: ZodNull,
	output: () => ({ type: 'null' }),
});

export const UndefinedGenerator = Generator({
	schema: ZodUndefined,
	output: () => ({ type: 'undefined' }),
});

export const ArrayGenerator = Generator({
	schema: ZodArray,
	output: ({ def, core, context }) => ({
		type: 'array',
		value: core.from(def.type, context),
	}),
});

export const UnionGenerator = Generator({
	schema: ZodUnion,
	output: ({ def, core, context }) => ({
		type: 'union',
		value: def.options.map((type) => core.from(type, context)),
	}),
});

export const TupleGenerator = Generator({
	schema: ZodTuple,
	output: ({ def, core, context }) => {
		const known = def.items.map((type, idx) =>
			core.from(type, { path: [...context.path, idx] })
		);
		const rest = def.rest
			? [core.from(def.rest, { path: [...context.path, known.length] })]
			: [];

		return [...known, ...rest];
	},
});

export const seraializeGenerators = [
	BigIntGenerator,
	NumberGenerator,
	StringGenerator,
	BoolGenerator,
	DateGenerator,
	EffectsGenerator,
	EnumGenerator,
	NativeEnumGenerator,
	FunctionGenerator,
	NanGenerator,
	UndefinedGenerator,
	ArrayGenerator,
	UnionGenerator,
	TupleGenerator,
];
