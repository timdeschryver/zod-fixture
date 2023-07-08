import { ZodAny } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const AnyGenerator = Generator({
	schema: ZodAny,
	// @TODO: implement a more robust any generator.
	output: () => 'ZodAny',
});
