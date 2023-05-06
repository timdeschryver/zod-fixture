import { Config, Core } from './core/core';
import defaultGenerators from './generators/default';

export function generate<TSchema extends Zod.ZodTypeAny>(
	schema: TSchema,
	config: Config = {},
): unknown {
	return new Core(config).register(defaultGenerators).generate(schema);
}
