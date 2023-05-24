import { Definition } from '@/core/generator';
import { Config, Core } from './core/core';
import defaultGenerators from './generators/default';

export { Generator } from '@/core/generator';

export function generate<TSchema extends Zod.ZodTypeAny>(
	schema: TSchema,
	config: Config & {
		extend?: Definition<any>[];
	} = {},
): unknown {
	return new Core(config)
		.register(defaultGenerators)
		.register(config.extend ?? [])
		.generate(schema, { path: [] });
}
