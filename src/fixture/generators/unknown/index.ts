import { ZodUnknown } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const UnknownGenerator = Generator({
	schema: ZodUnknown,
	// @TODO: implement a more robust unknown generator.
	output: () => 'ZodUnknown',
});
