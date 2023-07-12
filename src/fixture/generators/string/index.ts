import { ZodString } from '@/internal/zod';
import { Generator } from '@/transformer/generator';
import type { Runner } from '@/transformer/runner';
import type { ZodStringDef } from 'zod';

function formatString(transform: Runner, def: ZodStringDef, value: string) {
	const checks = transform.utils.checks(def.checks);

	let max = checks.find('max')?.value;
	const length = checks.find('length')?.value;
	const isUpperCase = checks.has('toUpperCase');
	const isLowerCase = checks.has('toLowerCase');
	const startsWith = checks.find('startsWith')?.value;
	const endsWith = checks.find('endsWith')?.value;

	if (length) {
		max = length;
	}

	if (max && (startsWith || endsWith)) {
		if (
			max &&
			value.length < max + (startsWith?.length ?? 0) + (endsWith?.length ?? 0)
		) {
			value = value.slice(
				0,
				max - (startsWith?.length ?? 0) - (endsWith?.length ?? 0)
			);
		}
	}

	if (startsWith) {
		value = startsWith + value;
	}
	if (endsWith) {
		value = value + endsWith;
	}

	if (isUpperCase) {
		value = value.toUpperCase();
	} else if (isLowerCase) {
		value = value.toLowerCase();
	}

	return max ? value.slice(0, max) : value;
}

export const StringGenerator = Generator({
	schema: ZodString,
	output: ({ def, transform }) => {
		const checks = transform.utils.checks(def.checks);

		let min = checks.find('min')?.value ?? 1;
		let max = checks.find('max')?.value ?? min + 25;
		const length = checks.find('length');

		if (length) {
			min = length.value;
			max = length.value;
		}

		if (min < 0)
			throw new Error(
				`Minimum length of a string can't be less than 0: ${min}`
			);

		return formatString(
			transform,
			def,
			transform.utils.random.string({ min, max })
		);
	},
});

export const UrlGenerator = Generator({
	schema: ZodString,
	filter: ({ def, transform }) => transform.utils.checks(def.checks).has('url'),
	output: ({ def, transform }) => {
		return formatString(
			transform,
			def,
			`https://${transform.utils.random.lorem(1)}.com`
		);
	},
});

export const UuidGenerator = Generator({
	schema: ZodString,
	filter: ({ def, transform }) =>
		transform.utils.checks(def.checks).has('uuid'),
	output: ({ transform }) => transform.utils.random.uuid(),
});

export const EmailGenerator = Generator({
	schema: ZodString,
	filter: ({ def, transform }) =>
		transform.utils.checks(def.checks).has('email'),
	output: ({ def, transform }) =>
		formatString(transform, def, 'rando@email.com'),
});

export const CuidGenerator = Generator({
	schema: ZodString,
	filter: ({ def, transform }) =>
		transform.utils.checks(def.checks).has('cuid'),
	output: () => {
		throw new Error(`cuid has been deprecated in favor of cuid2`);
	},
});

export const Cuid2Generator = Generator({
	schema: ZodString,
	filter: ({ def, transform }) =>
		transform.utils.checks(def.checks).has('cuid2'),
	output: ({ def, transform }) =>
		formatString(transform, def, transform.utils.random.cuid2()),
});

export const DateTimeGenerator = Generator({
	schema: ZodString,
	filter: ({ def, transform }) =>
		transform.utils.checks(def.checks).has('datetime'),
	output: ({ transform }) => transform.utils.random.date().toISOString(),
});
