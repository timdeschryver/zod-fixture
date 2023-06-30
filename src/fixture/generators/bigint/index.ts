import { Generator } from '@/transformer/generator';
import { ZodBigInt } from 'zod';

export const BigIntGenerator = Generator({
	schema: ZodBigInt,
	filter: ({ def, transform }) =>
		!transform.utils.checks(def.checks).has('multipleOf'),
	output: ({ def, transform }) => {
		const checks = transform.utils.checks(def.checks);

		const min = checks.find('min')?.value;
		const max = checks.find('max')?.value;

		return transform.utils.random.bigInt({ min, max });
	},
});

export const BigIntMultipleOfGenerator = Generator({
	schema: ZodBigInt,
	filter: ({ def, transform }) =>
		transform.utils.checks(def.checks).has('multipleOf'),
	output: ({ def, transform }) => {
		const checks = transform.utils.checks(def.checks);

		const minRaw = checks.find('min')?.value ?? transform.defaults.bigint.min;
		const maxRaw = checks.find('max')?.value ?? transform.defaults.bigint.max;

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const multipleOf = checks.find('multipleOf')!.value ?? 1;

		const min = minRaw / multipleOf;
		const max = maxRaw / multipleOf;

		return transform.utils.random.bigInt({ min, max }) * multipleOf;
	},
});
