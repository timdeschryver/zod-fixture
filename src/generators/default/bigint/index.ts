import { Generator } from '@/core/generator';
import { ZodBigInt } from 'zod';

export const BigIntGenerator = Generator({
	schema: ZodBigInt,
	matches: ({ def, core }) =>
		core.utils.filter.checks(def.checks, 'multipleOf') === undefined,
	output: ({ def, core }) => {
		const { filter } = core.utils;

		const min = filter.checks(def.checks, 'min')?.value;
		const max = filter.checks(def.checks, 'max')?.value;

		return core.utils.random.bigInt({ min, max });
	},
});

export const BigIntMultipleOfGenerator = Generator({
	schema: ZodBigInt,
	matches: ({ def, core }) =>
		core.utils.filter.checks(def.checks, 'multipleOf') !== undefined,
	output: ({ def, core }) => {
		const { filter } = core.utils;

		const minRaw =
			filter.checks(def.checks, 'min')?.value ?? core.defaults.bigint.min;
		const maxRaw =
			filter.checks(def.checks, 'max')?.value ?? core.defaults.bigint.max;

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const multipleOf = filter.checks(def.checks, 'multipleOf')!.value ?? 1;

		const min = minRaw / multipleOf;
		const max = maxRaw / multipleOf;

		return core.utils.random.bigInt({ min, max }) * multipleOf;
	},
});
