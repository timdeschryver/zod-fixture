import type { z } from 'zod';
import type { Context } from '../transformer/generator';
import { Transformer } from '../transformer/transformer';
import { fixtureGenerators } from './generators';

export interface Fixture extends Transformer {
	// explicitly define the return type
	from<TSchema extends z.ZodTypeAny>(
		schema: TSchema,
		context?: Context
	): z.infer<TSchema>;
}

export class Fixture extends Transformer {
	generators = fixtureGenerators;

	missingGeneratorError(schema: z.ZodTypeAny) {
		const message = [
			`No generator found for ${schema.constructor.name}.`,
			'',
			'For z.custom, refer to the documentation https://github.com/timdeschryver/zod-fixture.',
			'If you still believe this is an error, please open an issue at https://github.com/timdeschryver/zod-fixture/issues/new.',
			'',
		].join('\n');

		return new Error(message);
	}
}
