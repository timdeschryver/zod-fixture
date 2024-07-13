import type { ZodTypeAny } from 'zod';
import type { Runner } from './runner';

// #region context
export interface Context {
	path: (string | number)[];
}
// #endregion context

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
	schema?: TSchema;
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
