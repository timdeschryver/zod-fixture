/* eslint-disable @typescript-eslint/no-empty-function */
// No need to bundle the full zod library since we only use the typeNames
// to identify the schemas.

import type {
	EnumLike,
	ZodAny as TrueZodAny,
	ZodArray as TrueZodArray,
	ZodBigInt as TrueZodBigInt,
	ZodBoolean as TrueZodBoolean,
	ZodBranded as TrueZodBranded,
	ZodCatch as TrueZodCatch,
	ZodDate as TrueZodDate,
	ZodDefault as TrueZodDefault,
	ZodDiscriminatedUnion as TrueZodDiscriminatedUnion,
	ZodEffects as TrueZodEffects,
	ZodEnum as TrueZodEnum,
	ZodFunction as TrueZodFunction,
	ZodIntersection as TrueZodIntersection,
	ZodLazy as TrueZodLazy,
	ZodLiteral as TrueZodLiteral,
	ZodMap as TrueZodMap,
	ZodNaN as TrueZodNaN,
	ZodNativeEnum as TrueZodNativeEnum,
	ZodNever as TrueZodNever,
	ZodNull as TrueZodNull,
	ZodNullable as TrueZodNullable,
	ZodNumber as TrueZodNumber,
	ZodObject as TrueZodObject,
	ZodOptional as TrueZodOptional,
	ZodPipeline as TrueZodPipeline,
	ZodPromise as TrueZodPromise,
	ZodRecord as TrueZodRecord,
	ZodSet as TrueZodSet,
	ZodString as TrueZodString,
	ZodSymbol as TrueZodSymbol,
	ZodTuple as TrueZodTuple,
	ZodUndefined as TrueZodUndefined,
	ZodUnion as TrueZodUnion,
	ZodUnknown as TrueZodUnknown,
	ZodVoid as TrueZodVoid,
	ZodDiscriminatedUnionOption,
	ZodRawShape,
	ZodTypeAny,
} from 'zod';

import type { ZodConstructor } from '@/transformer/generator';

// Forces typescript to cast our fake constructors as a true zod type
const castAs = <T extends ZodTypeAny>(value: string) => {
	const fake = () => {};
	Object.defineProperty(fake, 'name', { value });
	return fake as unknown as ZodConstructor<T>;
};

export const instance = <TSchema extends ZodTypeAny>(schema: TSchema) =>
	({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		_def: { typeName: (schema as any).name },
	} as TSchema);

export const ZodString = castAs<TrueZodString>('ZodString');
export const ZodNumber = castAs<TrueZodNumber>('ZodNumber');
export const ZodNaN = castAs<TrueZodNaN>('ZodNaN');
export const ZodBigInt = castAs<TrueZodBigInt>('ZodBigInt');
export const ZodBoolean = castAs<TrueZodBoolean>('ZodBoolean');
export const ZodDate = castAs<TrueZodDate>('ZodDate');
export const ZodSymbol = castAs<TrueZodSymbol>('ZodSymbol');
export const ZodUndefined = castAs<TrueZodUndefined>('ZodUndefined');
export const ZodNull = castAs<TrueZodNull>('ZodNull');
export const ZodAny = castAs<TrueZodAny>('ZodAny');
export const ZodUnknown = castAs<TrueZodUnknown>('ZodUnknown');
export const ZodNever = castAs<TrueZodNever>('ZodNever');
export const ZodVoid = castAs<TrueZodVoid>('ZodVoid');
export const ZodArray = castAs<TrueZodArray<ZodTypeAny>>('ZodArray');
export const ZodObject = castAs<TrueZodObject<ZodRawShape>>('ZodObject');
export const ZodUnion =
	castAs<TrueZodUnion<readonly [ZodTypeAny, ...ZodTypeAny[]]>>('ZodUnion');
export const ZodDiscriminatedUnion = castAs<
	TrueZodDiscriminatedUnion<string, ZodDiscriminatedUnionOption<string>[]>
>('ZodDiscriminatedUnion');
export const ZodIntersection =
	castAs<TrueZodIntersection<ZodTypeAny, ZodTypeAny>>('ZodIntersection');
export const ZodTuple = castAs<TrueZodTuple>('ZodTuple');
export const ZodRecord = castAs<TrueZodRecord>('ZodRecord');
export const ZodMap = castAs<TrueZodMap>('ZodMap');
export const ZodSet = castAs<TrueZodSet>('ZodSet');
export const ZodFunction =
	castAs<TrueZodFunction<TrueZodTuple<[], ZodTypeAny>, ZodTypeAny>>(
		'ZodFunction'
	);
export const ZodLazy = castAs<TrueZodLazy<ZodTypeAny>>('ZodLazy');
export const ZodLiteral = castAs<TrueZodLiteral<unknown>>('ZodLiteral');
export const ZodEnum = castAs<TrueZodEnum<[string, ...string[]]>>('ZodEnum');
export const ZodEffects = castAs<TrueZodEffects<ZodTypeAny>>('ZodEffects');
export const ZodNativeEnum =
	castAs<TrueZodNativeEnum<EnumLike>>('ZodNativeEnum');
export const ZodOptional = castAs<TrueZodOptional<ZodTypeAny>>('ZodOptional');
export const ZodNullable = castAs<TrueZodNullable<ZodTypeAny>>('ZodNullable');
export const ZodDefault = castAs<TrueZodDefault<ZodTypeAny>>('ZodDefault');
export const ZodCatch = castAs<TrueZodCatch<ZodTypeAny>>('ZodCatch');
export const ZodPromise = castAs<TrueZodPromise<ZodTypeAny>>('ZodPromise');
export const ZodBranded =
	castAs<TrueZodBranded<ZodTypeAny, PropertyKey>>('ZodBranded');
export const ZodPipeline =
	castAs<TrueZodPipeline<ZodTypeAny, ZodTypeAny>>('ZodPipeline');

/* eslint-enable @typescript-eslint/no-empty-function */
