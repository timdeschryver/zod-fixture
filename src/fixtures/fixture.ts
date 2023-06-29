import type { ZodTypeAny, z } from 'zod';
import type { Config } from '../core/core';
import { Core } from '../core/core';
import type { Definition } from '../core/generator';
import { fixtureGenerators } from './generators';

export function createFixture<TSchema extends ZodTypeAny>(
	schema: TSchema,
	config: Config & {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		extend?: Definition<any> | Definition<any>[];
	} = {}
): z.infer<TSchema> {
	return new Core(config)
		.register(config.extend ?? [])
		.register(fixtureGenerators)
		.generate(schema);
}
