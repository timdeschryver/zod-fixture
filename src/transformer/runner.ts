import type { ZodTypeAny } from 'zod';
import type { Context } from './generator';
import { ZOD_INSTANCE_IDENTIFIER, isZodConstructor } from './generator';
import type { Transformer } from './transformer';
import { Utils } from './utils';

export class Runner {
	readonly defaults: ZodFixture.Defaults;
	readonly utils: Utils;

	constructor(
		public readonly transformer: Transformer,
		config?: Partial<ZodFixture.Defaults>
	) {
		this.defaults = { ...transformer.defaults, ...config };
		this.utils = new Utils(this);
	}

	fromSchema<TSchema extends ZodTypeAny>(
		schema: TSchema,
		context: Context = { path: [] }
	): unknown {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const transform = this;
		const def = schema._def;
		const generator = this.transformer.generators.find((generator) => {
			const generaterType = isZodConstructor(generator.schema)
				? generator.schema.name
				: generator.schema._def.typeName;

			if (def.typeName !== generaterType) {
				return false;
			}

			// If our generator was created with an instance, make sure it matches
			// the schema we're trying to generate.
			// This is particularly important for z.custom schemas.
			if (generator.schema[ZOD_INSTANCE_IDENTIFIER] !== undefined) {
				if (
					schema[ZOD_INSTANCE_IDENTIFIER] !==
					generator.schema[ZOD_INSTANCE_IDENTIFIER]
				)
					return false;
			}

			if (
				generator.filter &&
				!generator.filter({ schema, def, transform, context })
			) {
				return false;
			}

			return true;
		});

		this.shouldHaveMatch(schema, generator);

		return generator.output({ schema, def, transform, context });
	}

	shouldHaveMatch(
		schema: ZodTypeAny,
		generator: unknown
	): asserts generator is NonNullable<unknown> {
		if (!generator) throw this.transformer.missingGeneratorError(schema);
	}
}
