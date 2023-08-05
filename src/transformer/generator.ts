import type { ZodTypeAny } from '@/internal/zod';
import type { Runner } from './runner';

// #region context
export interface Context {
	path: (string | number)[];
}
// #endregion context

export interface ZodConstructor<TSchema extends ZodTypeAny> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	new (...args: any[]): TSchema;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	create(...args: any[]): TSchema;
}

export type ZodConstructorOrSchema<TSchema extends ZodTypeAny> =
	| TSchema
	| ZodConstructor<TSchema>;

export function isZodConstructor(
	schema: ZodConstructorOrSchema<ZodTypeAny>,
): schema is ZodConstructor<ZodTypeAny> {
	return typeof schema === 'function';
}

// #region filter
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Filter<TSchema extends ZodTypeAny = any> = (obj: {
	def: TSchema['_def'];
	schema: TSchema;
	transform: Runner;
	context: Context;
}) => boolean;
// #endregion filter

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Generator<TSchema extends ZodTypeAny = any> = (obj: {
	def: TSchema['_def'];
	schema: TSchema;
	transform: Runner;
	context: Context;
}) => unknown;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Definition<TSchema extends ZodTypeAny = any> {
	schema?: ZodConstructorOrSchema<TSchema>;
	filter?: Filter<TSchema>;
	output: Generator<TSchema>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Generator<TSchema extends ZodTypeAny = any>(
	definition: Definition<TSchema>,
): Definition<TSchema> {
	return definition;
}

export type { Filter };
