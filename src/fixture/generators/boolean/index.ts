import { ZodBoolean } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

// eslint-disable-next-line prefer-const
let toggle = false;
export const BooleanGenerator = Generator({
	schema: ZodBoolean,
	output: () => (toggle = !toggle),
});
