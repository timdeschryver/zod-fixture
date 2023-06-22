import { Generator } from '@/core/generator';
import {
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
	ZodUndefined,
} from 'zod';

export const BigIntGenerator = Generator({
	schema: ZodBigInt,
	matches: () => true,
	output: () => 'bigint',
});

export const BoolGenerator = Generator({
	schema: ZodBoolean,
	matches: () => true,
	output: () => 'boolean',
});

export const DateGenerator = Generator({
	schema: ZodDate,
	matches: () => true,
	output: () => 'date',
});

export const NumberGenerator = Generator({
	schema: ZodNumber,
	matches: () => true,
	output: () => 'number',
});

export const StringGenerator = Generator({
	schema: ZodString,
	matches: () => true,
	output: () => 'string',
});

export const EffectsGenerator = Generator({
	schema: ZodEffects,
	matches: () => true,
	output: () => 'effects',
});

export const EnumGenerator = Generator({
	schema: ZodEnum,
	matches: () => true,
	output: ({ def }) => `enum(${def.values})`,
});

export const NativeEnumGenerator = Generator({
	schema: ZodNativeEnum,
	matches: () => true,
	output: ({ def }) => {
		const enumerable = def.values ?? {};

		const values = Object.keys(enumerable)
			.filter((key) => Number.isNaN(Number(key)))
			.map((key) => enumerable[key]);

		return `enum(${values})`;
	},
});

export const FunctionGenerator = Generator({
	schema: ZodFunction,
	matches: () => true,
	output: () => 'function',
});

export const NanGenerator = Generator({
	schema: ZodNaN,
	matches: () => true,
	output: () => 'nan',
});

export const NullGenerator = Generator({
	schema: ZodNull,
	matches: () => true,
	output: () => 'null',
});

export const UndefinedGenerator = Generator({
	schema: ZodUndefined,
	matches: () => true,
	output: () => 'undefined',
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
];
