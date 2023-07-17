import { ZodUndefined, ZodVoid } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const UndefinedGenerator = Generator({
	schema: ZodUndefined,
	output: () => undefined,
});

export const VoidGenerator = Generator({
	schema: ZodVoid,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	output: () => {},
});
