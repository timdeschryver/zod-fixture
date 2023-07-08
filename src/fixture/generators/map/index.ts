import { Generator } from '@/transformer/generator';
import type { z } from 'zod';
import { ZodMap } from 'zod';

export const MapGenerator = Generator({
	schema: ZodMap,
	output: ({ def, transform, context }) => {
		const key = def.keyType;
		const value = def.valueType;

		const map = new Map<z.infer<typeof key>, z.infer<typeof value>>();

		transform.utils.ifNotNever(key, (keySchema) => {
			transform.utils.ifNotNever(value, (valueSchema) => {
				transform.utils.n(() => {
					const k = transform.from(keySchema, context) as string | number;
					const v = transform.from(valueSchema, {
						path: [...context.path, k],
					});

					map.set(k, v);
				}, transform.defaults.map);
			});
		});

		return map;
	},
});
