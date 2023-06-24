import { Generator } from '@/core/generator';
import { ZodBoolean } from 'zod';

// eslint-disable-next-line prefer-const
let toggle = false;
export const BooleanGenerator = Generator({
	schema: ZodBoolean,
	output: () => toggle = !toggle,
});
