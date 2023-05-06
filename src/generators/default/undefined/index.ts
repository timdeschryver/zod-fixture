import { Generator } from '@/core/generator';
import { ZodUndefined } from 'zod';

export const UndefinedGenerator = Generator({
	schema: ZodUndefined,
	test: () => true,
	output: () => undefined,
});
