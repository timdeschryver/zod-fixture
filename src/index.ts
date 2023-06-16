import type { Definition } from '@/core/generator';
import type { ZodTypeAny, z } from 'zod';
import type { Config} from './core/core';
import { Core } from './core/core';
import defaultGenerators from './generators/default';

export { Core } from '@/core/core';
export { Generator } from '@/core/generator';

export function createFixture<TSchema extends ZodTypeAny>(
	schema: TSchema,
	config: Config & {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		extend?: Definition<any>[];
	} = {},
): z.infer<TSchema> {
	return new Core(config)
		.register(defaultGenerators)
		.register(config.extend ?? [])
		.generate(schema);
}
