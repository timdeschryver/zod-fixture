import { ZodString } from '@/internal/zod';
import { Generator } from '@/transformer/generator';
import type { Runner } from '@/transformer/runner';
import type { ZodStringDef } from 'zod';

const prefixPattern = (str: string) => `^.{${str.length}}`;
const suffixPattern = (str: string) => `.{${str.length}}$`;

function formatString(transform: Runner, def: ZodStringDef, value: string) {
	const checks = transform.utils.checks(def.checks);

	let max = checks.find('max')?.value;
	let min = checks.find('min')?.value ?? 0;
	const length = checks.find('length')?.value;
	const includes = checks.find('includes')?.value;
	const startsWith = checks.find('startsWith')?.value;
	const endsWith = checks.find('endsWith')?.value;
	const emoji = checks.has('emoji');
	const isTrimmed = checks.has('trim');
	const isUpperCase = checks.has('toUpperCase');
	const isLowerCase = checks.has('toLowerCase');

	if (length) {
		min = length;
		max = length;
	}

	if (min != null && value.length < min) {
		const diff = min - value.length;
		value += transform.utils.random.string({ min: diff, max: diff });
	}

	if (max != null) {
		value = value.slice(0, max);
	}

	if (includes) {
		const prefix = startsWith ? prefixPattern(startsWith) : '';
		value = value.replace(
			new RegExp(`(${prefix}).{${includes.length}}`),
			(_, prefix) => prefix + includes
		);
	}

	if (startsWith) {
		value = value.replace(new RegExp(prefixPattern(startsWith)), startsWith);
	}

	if (endsWith) {
		value = value.replace(new RegExp(suffixPattern(endsWith)), endsWith);
	}

	if (isUpperCase) {
		value = value.toUpperCase();
	} else if (isLowerCase) {
		value = value.toLowerCase();
	}

	if (isTrimmed) {
		value = value.trim();
	}

	if (emoji) {
		value = value.replace(/./g, () => transform.utils.random.emoji());
	}

	return max ? value.slice(0, max) : value;
}

export const StringGenerator = Generator({
	schema: ZodString,
	output: ({ def, transform }) => {
		const checks = transform.utils.checks(def.checks);

		let min = checks.find('min')?.value;
		let max = checks.find('max')?.value;

		const length = checks.find('length');
		if (length) {
			min = length.value;
			max = length.value;
		}

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
