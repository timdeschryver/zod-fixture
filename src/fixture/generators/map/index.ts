import { ZodMap } from '@/internal/zod';
import { Generator } from '@/transformer/generator';
import type { z } from 'zod';

export const MapGenerator = Generator({
	schema: ZodMap,
	output: ({ def, transform, context }) => {
		const key = def.keyType;
		const value = def.valueType;

		const map = new Map<z.infer<typeof key>, z.infer<typeof value>>();

		transform.utils.n(() => {
			const k = transform.from(key, context) as string | number;
			const v = transform.from(value, { path: [...context.path, k] });

			map.set(k, v);
		}, transform.defaults.map);

		return map;
	},
});
