import { Generator } from '@/core/generator';
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
	matches: () => true,
	output: () => ({ type: 'bigint' }),
});

export const BoolGenerator = Generator({
	schema: ZodBoolean,
	matches: () => true,
	output: () => ({ type: 'boolean' }),
});

export const DateGenerator = Generator({
	schema: ZodDate,
	matches: () => true,
	output: () => ({ type: 'date' }),
});

export const NumberGenerator = Generator({
	schema: ZodNumber,
	matches: () => true,
	output: () => ({ type: 'number' }),
});

export const StringGenerator = Generator({
	schema: ZodString,
	matches: () => true,
	output: () => ({ type: 'string' }),
});

export const EffectsGenerator = Generator({
	schema: ZodEffects,
	matches: () => true,
	output: () => ({ type: 'effects' }),
});

export const EnumGenerator = Generator({
	schema: ZodEnum,
	matches: () => true,
	output: ({ def }) => ({ type: 'enum', value: def.values }),
});

export const NativeEnumGenerator = Generator({
	schema: ZodNativeEnum,
	matches: () => true,
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
	matches: () => true,
	output: () => ({ type: 'function' }),
});

export const NanGenerator = Generator({
	schema: ZodNaN,
	matches: () => true,
	output: () => ({ type: 'nan' }),
});

export const NullGenerator = Generator({
	schema: ZodNull,
	matches: () => true,
	output: () => ({ type: 'null' }),
});

export const UndefinedGenerator = Generator({
	schema: ZodUndefined,
	matches: () => true,
	output: () => ({ type: 'undefined' }),
});

export const ArrayGenerator = Generator({
	schema: ZodArray,
	matches: () => true,
	output: ({ def, core, context }) => ({
		type: 'array',
		value: core.generate(def.type, context),
	}),
});

export const UnionGenerator = Generator({
	schema: ZodUnion,
	matches: () => true,
	output: ({ def, core, context }) => ({
		type: 'union',
		value: def.options.map((type) => core.generate(type, context)),
	}),
});

export const TupleGenerator = Generator({
	schema: ZodTuple,
	matches: () => true,
	output: ({ def, core, context }) => {
		const known = def.items.map((type, idx) =>
			core.generate(type, { path: [...context.path, idx] })
		);
		const rest = def.rest
			? [core.generate(def.rest, { path: [...context.path, known.length] })]
			: [];

		return [...known, ...rest];
	},
});

export default [
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
