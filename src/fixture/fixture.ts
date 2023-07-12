import type { z } from 'zod';
import type { Defaults } from '../transformer/defaults';
import {
	ConstrainedTransformer,
	UnconstrainedTransformer,
} from '../transformer/transformer';
import { fixtureGenerators } from './generators';

function missingGeneratorError(schema: z.ZodTypeAny) {
	const message = [
		`No generator found for ${schema.constructor.name}.`,
		'',
		'For z.custom, refer to the documentation https://github.com/timdeschryver/zod-fixture.',
		'If you still believe this is an error, please open an issue at https://github.com/timdeschryver/zod-fixture/issues/new.',
		'',
	].join('\n');

	return new Error(message);
}

export interface ConstrainedFixture extends ConstrainedTransformer {
	// explicitly define the return type
	fromSchema<TSchema extends z.ZodTypeAny>(
		schema: TSchema,
		userDefaults?: Partial<Defaults>
	): z.infer<TSchema>;
}

export class ConstrainedFixture extends ConstrainedTransformer {
	generators = fixtureGenerators;
	missingGeneratorError = missingGeneratorError;
}

export interface UnconstrainedFixture extends UnconstrainedTransformer {
	// explicitly define the return type
	fromSchema<TSchema extends z.ZodTypeAny>(
		schema: TSchema,
		userDefaults?: Partial<Defaults>
	): z.infer<TSchema>;
}

export class UnconstrainedFixture extends UnconstrainedTransformer {
	generators = fixtureGenerators;
	missingGeneratorError = missingGeneratorError;
}

export { ConstrainedFixture as Fixture };
