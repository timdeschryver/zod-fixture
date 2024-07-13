import type { TypeOf } from 'zod';
import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const MapGenerator = Generator({
	schema: z.map(z.any(), z.any()),
	output: ({ def, transform, context }) => {
		const key = def.keyType;
		const value = def.valueType;

		const map = new Map<TypeOf<typeof key>, TypeOf<typeof value>>();

		transform.utils.ifNotNever(key, (keySchema) => {
			transform.utils.ifNotNever(value, (valueSchema) => {
				transform.utils.recursionCheck(valueSchema, () => {
					transform.utils.n(() => {
						const k = transform.fromSchema(keySchema, context) as
							| string
							| number;
						const v = transform.fromSchema(valueSchema, {
							...context,
							path: [...context.path, k],
						});

						map.set(k, v);
					}, transform.defaults.map);
				});
			});
		});

		return map;
	},
});
