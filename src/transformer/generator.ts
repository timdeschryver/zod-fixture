import type { ZodTypeAny } from 'zod';
import type { Transformer } from './transformer';

export interface Context {
	path: (string | number)[];
}

export type ZodConstructor<TSchema extends ZodTypeAny> = new (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	def: any
) => TSchema;

export type ZodConstructorOrSchema<TSchema extends ZodTypeAny> =
	| TSchema
	| ZodConstructor<TSchema>;

export type Filter<TSchema extends ZodTypeAny> = (obj: {
	def: TSchema['_def'];
	schema: TSchema;
	transform: Transformer;
	context: Context;
}) => boolean;

export type Generator<TSchema extends ZodTypeAny> = (obj: {
	def: TSchema['_def'];
	schema: TSchema;
	transform: Transformer;
	context: Context;
}) => unknown;

export interface Definition<TSchema extends ZodTypeAny> {
	schema: ZodConstructorOrSchema<TSchema>;
	filter?: Filter<TSchema>;
	output: Generator<TSchema>;
}

export function Generator<TSchema extends ZodTypeAny>(
	definition: Definition<TSchema>
): Definition<TSchema> {
	return definition;
}
