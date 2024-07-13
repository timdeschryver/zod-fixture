import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const UndefinedGenerator = Generator({
	schema: z.undefined(),
	output: () => undefined,
});

export const VoidGenerator = Generator({
	schema: z.void(),
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	output: () => {},
});
