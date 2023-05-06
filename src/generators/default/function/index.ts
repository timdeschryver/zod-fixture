import { Generator } from '@/core/generator';
import { ZodFunction } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop: () => void = () => {};

export const FunctionGenerator = Generator({
	schema: ZodFunction,
	test: () => true,
	output: () => noop,
});