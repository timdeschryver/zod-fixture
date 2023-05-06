import { Generator } from '@/core/generator';
import { ZodString } from 'zod';

const LOWERCASE_A = 97;
const LOWERCASE_Z = 122;

export const StringGenerator = Generator({
	schema: ZodString,
	test: () => true,
	output: ({ def, core }) => {
		const min = core.utils.filterChecks(def.checks, 'min')?.value ?? 0;
		const max = core.utils.filterChecks(def.checks, 'max')?.value ?? min + 25;
		const range = { min, max };

		const length = core.utils.filterChecks(def.checks, 'length');
		if (length) {
			range.min = length.value;
			range.max = length.value;
		}

		if (range.min < 0) {
			throw new Error(
				`Minimum length of a string can't be less than 0: ${range.min}`,
			);
		}

		let result = core.utils
			.n(
				() =>
					String.fromCharCode(
						core.utils.randomInt({ min: LOWERCASE_A, max: LOWERCASE_Z }),
					),
				range,
			)
			.join('');

		if (core.utils.filterChecks(def.checks, 'toUpperCase') !== undefined) {
			result = result.toUpperCase();
		} else if (
			core.utils.filterChecks(def.checks, 'toLowerCase') !== undefined
		) {
			result = result.toLowerCase();
		}

		return result;
	},
});

export const UrlGenerator = Generator({
	schema: ZodString,
	test: ({ def, core }) =>
		core.utils.filterChecks(def.checks, 'url') !== undefined,
	output: ({ core }) => {
		return `https://${core.utils.lorem(1)}.com`;
	},
});
