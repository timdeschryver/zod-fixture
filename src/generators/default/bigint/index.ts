import { Generator } from '@/core/generator';
import { ZodBigInt } from 'zod';

export const BigIntGenerator = Generator({
	schema: ZodBigInt,
	test: ({ def, core }) =>
		core.utils.filterChecks(def.checks, 'multipleOf') === undefined,
	output: ({ def, core }) => {
		const { filterChecks } = core.utils;

		const min = filterChecks(def.checks, 'min')?.value;
		const max = filterChecks(def.checks, 'max')?.value;

		return core.utils.randomBigInt({ min, max });
	},
});

export const BigIntMultipleOfGenerator = Generator({
	schema: ZodBigInt,
	test: ({ def, core }) =>
		core.utils.filterChecks(def.checks, 'multipleOf') !== undefined,
	output: ({ def, core }) => {
		const { filterChecks } = core.utils;

		const minRaw =
			filterChecks(def.checks, 'min')?.value ?? core.defaults.bigint.min;
		const maxRaw =
			filterChecks(def.checks, 'max')?.value ?? core.defaults.bigint.max;

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const multipleOf = filterChecks(def.checks, 'multipleOf')!.value ?? 1;

		const min = minRaw / multipleOf;
		const max = maxRaw / multipleOf;

		return core.utils.randomBigInt({ min, max }) * multipleOf;
	},
});
