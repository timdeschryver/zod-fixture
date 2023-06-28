import { Generator } from '@/core/generator';
import { ZodBigInt } from 'zod';

export const BigIntGenerator = Generator({
	schema: ZodBigInt,
	filter: ({ def, core }) => !core.utils.checks(def.checks).has('multipleOf'),
	output: ({ def, core }) => {
		const checks = core.utils.checks(def.checks);

		const min = checks.find('min')?.value;
		const max = checks.find('max')?.value;

		return core.utils.random.bigInt({ min, max });
	},
});

export const BigIntMultipleOfGenerator = Generator({
	schema: ZodBigInt,
	filter: ({ def, core }) => core.utils.checks(def.checks).has('multipleOf'),
	output: ({ def, core }) => {
		const checks = core.utils.checks(def.checks);

		const minRaw = checks.find('min')?.value ?? core.defaults.bigint.min;
		const maxRaw = checks.find('max')?.value ?? core.defaults.bigint.max;

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const multipleOf = checks.find('multipleOf')!.value ?? 1;

		const min = minRaw / multipleOf;
		const max = maxRaw / multipleOf;

		return core.utils.random.bigInt({ min, max }) * multipleOf;
	},
});
