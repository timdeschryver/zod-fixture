import { ZodArray } from 'zod';
import { Generator } from '../../../core/generator';

export default Generator({
	schema: ZodArray,
	test: () => true,
	output: () => {
		if (length < 0) {
			throw new Error(`length ${length} must be greater than or equal to 0`);
		}

		return Array.from({ length }, () => 1);
	},
});