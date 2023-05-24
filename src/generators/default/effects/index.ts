import { Generator } from '@/core/generator';
import { ZodEffects } from 'zod';

export const TransformGenerator = Generator({
	schema: ZodEffects,
	matches: ({ def }) => def.effect.type === 'transform',
	output: ({ def, core }) => {
		if (def.effect.type !== 'transform')
			throw new Error('Must be a transform effect.');

		const initialValue = core.generate(def.schema);
		return def.effect.transform(initialValue, {
			addIssue: () => {},
			// @TODO: Verify that path is not needed here.
			path: [],
		});
	},
});

export const PreprocessGenerator = Generator({
	schema: ZodEffects,
	matches: ({ def }) => def.effect.type === 'preprocess',
	output: ({ def, core }) => {
		if (def.effect.type !== 'preprocess')
			throw new Error('Must be a preprocess effect.');

		// We don't actually care about the preprocessor
		// when mocking data because we're not validating
		// input. We only care about the expected output.
		return core.generate(def.schema);
	},
});

export const RefinementGenerator = Generator({
	schema: ZodEffects,
	matches: ({ def }) => def.effect.type === 'refinement',
	output: ({ def, core }) => {
		if (def.effect.type !== 'refinement')
			throw new Error('Must be a refinement effect.');

		const { schema } = def;

		console.warn(
			`Because refinements use custom validations, we have no way to accurately manufacture acceptable values. Using the parent type (${schema._def.typeName}) to approximate the result.`,
		);
		return core.generate(schema);
	},
});
