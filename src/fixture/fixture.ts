import type { z } from 'zod';
import type { Defaults } from '../transformer/defaults';
import { constrained, unconstrained } from '../transformer/defaults';
import { Transformer } from '../transformer/transformer';
import { fixtureGenerators } from './generators';

export interface ConstrainedFixture extends Transformer {
	// explicitly define the return type
	fromSchema<TSchema extends z.ZodTypeAny>(
		schema: TSchema,
		userDefaults?: Partial<Defaults>
	): z.infer<TSchema>;
}

export class ConstrainedFixture extends Transformer {
	generators = fixtureGenerators;
	defaults = constrained;

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

export class UnconstrainedFixture extends ConstrainedFixture {
	defaults = unconstrained;
}

export { ConstrainedFixture as Fixture };
