import { Generator } from '@/core/genrator';
import { ZodUndefined, ZodVoid } from 'zod';

export const UndefinedGenerator = Generator({
	schema: ZodUndefined,
	output: () => undefined,
});

export const VoidGenerator = Generator({
	schema: ZodVoid,
	output: () => {},
});
