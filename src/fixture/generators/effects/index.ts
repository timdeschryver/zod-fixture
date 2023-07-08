import { ZodEffects } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const TransformGenerator = Generator({
	schema: ZodEffects,
	filter: ({ def }) => def.effect.type === 'transform',
	output: ({ def, transform, context }) => {
		if (def.effect.type !== 'transform')
			throw new Error('Must be a transform effect.');

		const initialValue = transform.from(def.schema, context);
		return def.effect.transform(initialValue, {
			addIssue: transform.utils.noop,
			// @TODO: Verify that path is not needed here.
			path: [],
		});
	},
});

export const PreprocessGenerator = Generator({
	schema: ZodEffects,
	filter: ({ def }) => def.effect.type === 'preprocess',
	output: ({ def, transform, context }) => {
		if (def.effect.type !== 'preprocess')
			throw new Error('Must be a preprocess effect.');

		// We don't actually care about the preprocessor
		// when mocking data because we're not validating
		// input. We only care about the expected output.
		return transform.from(def.schema, context);
	},
});

export const RefinementGenerator = Generator({
	schema: ZodEffects,
	filter: ({ def }) => def.effect.type === 'refinement',
	output: ({ def, transform, context }) => {
		if (def.effect.type !== 'refinement')
			throw new Error('Must be a refinement effect.');

		const { schema } = def;

		console.warn(
			`Because refinements use custom validations, we have no way to accurately manufacture acceptable values. Using the parent type (${schema._def.typeName}) to approximate the result.`
		);
		return transform.from(schema, context);
	},
});
