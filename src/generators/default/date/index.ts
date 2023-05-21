import { Generator } from '@/core/generator';
import { ZodDate } from 'zod';

export const DateGenerator = Generator({
	schema: ZodDate,
	matches: () => true,
	output: () => new Date(),
});