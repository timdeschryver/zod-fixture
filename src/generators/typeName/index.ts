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
	output: () => 'bigint',
});

export const BoolGenerator = Generator({
	schema: ZodBoolean,
	output: () => 'boolean',
});

export const DateGenerator = Generator({
	schema: ZodDate,
	output: () => 'date',
});

export const NumberGenerator = Generator({
	schema: ZodNumber,
	output: () => 'number',
});

export const StringGenerator = Generator({
	schema: ZodString,
	output: () => 'string',
});

export const EffectsGenerator = Generator({
	schema: ZodEffects,
	output: () => 'effects',
});

export const EnumGenerator = Generator({
	schema: ZodEnum,
	output: ({ def }) => `enum(${def.values})`,
});

export const NativeEnumGenerator = Generator({
	schema: ZodNativeEnum,
	output: ({ def, core }) => {
		const enumerable = def.values ?? {};

		const values = Object.keys(enumerable)
			.filter((key) => Number.isNaN(Number(key)))
			.map((key) => enumerable[key]);

		return `enum(${values})`;
	},
});

export const FunctionGenerator = Generator({
	schema: ZodFunction,
	output: () => 'function',
});

export const NanGenerator = Generator({
	schema: ZodNaN,
	output: () => 'nan',
});

export const NullGenerator = Generator({
	schema: ZodNull,
	output: () => 'null',
});

export const UndefinedGenerator = Generator({
	schema: ZodUndefined,
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
