import type { z } from 'zod';
import type { Context } from '../transformer/generator';
import { Transformer } from '../transformer/transformer';
import { fixtureGenerators } from './generators';

export class Fixture extends Transformer {
	generators = fixtureGenerators;

	// explicitly define the return type
	from<TSchema extends z.ZodTypeAny>(
		schema: TSchema,
		context?: Context
	): z.infer<TSchema> {
		return super.from(schema, context);
	}
}