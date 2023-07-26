import type { ZodTypeAny } from 'zod';
import type { Defaults } from './defaults';
import type { Context } from './generator';
import type { Transformer } from './transformer';
import { Utils } from './utils';

export class Runner {
	readonly defaults: Defaults;
	readonly utils: Utils;

	constructor(
		public readonly transformer: Transformer,
		schemaDefaults?: Partial<Defaults>
	) {
		this.defaults = {
			...transformer.transformerDefaults,
			...transformer.instanceDefaults,
			...schemaDefaults,
		};
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
			if (!transform.utils.isType(generator.schema, schema)) {
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
