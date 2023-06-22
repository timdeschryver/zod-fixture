import { Generator } from '@/core/generator';
import { ZodUndefined, ZodVoid } from 'zod';

export const UndefinedGenerator = Generator({
	schema: ZodUndefined,
	matches: () => true,
	output: () => undefined,
});

export const VoidGenerator = Generator({
	schema: ZodVoid,
	matches: () => true,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	output: () => {},
});
