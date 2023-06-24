import { Generator } from '@/core/generator';
import { ZodUndefined, ZodVoid } from 'zod';

export const UndefinedGenerator = Generator({
	schema: ZodUndefined,
	output: () => undefined,
});

export const VoidGenerator = Generator({
	schema: ZodVoid,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	output: () => {},
});
