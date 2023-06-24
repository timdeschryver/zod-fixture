import type { Core } from '@/core/core';
import { Generator } from '@/core/generator';
import type { ZodStringDef } from 'zod';
import { ZodString } from 'zod';

function formatString(core: Core, def: ZodStringDef, value: string) {
	let min = core.utils.filter.checks(def.checks, 'min')?.value;
	let max = core.utils.filter.checks(def.checks, 'max')?.value;
	const length = core.utils.filter.checks(def.checks, 'length')?.value;
	const isUpperCase =
		core.utils.filter.checks(def.checks, 'toUpperCase') !== undefined;
	const isLowerCase =
		core.utils.filter.checks(def.checks, 'toLowerCase') !== undefined;
	const startsWith = core.utils.filter.checks(def.checks, 'startsWith')?.value;
	const endsWith = core.utils.filter.checks(def.checks, 'endsWith')?.value;

	if (startsWith) {
		value = startsWith + value;
	}
	if (endsWith) {
		value = value + endsWith;
	}

	if (length) {
		min = length;
		max = length;
	}

	if (min) {
		const diff = min - value.length;
		if (diff > 0) value += core.utils.random.string({ min: diff, max: diff });
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
	matches: () => true,
	output: ({ def, core }) => {
		let min = core.utils.filter.checks(def.checks, 'min')?.value ?? 1;
		let max = core.utils.filter.checks(def.checks, 'max')?.value ?? min + 25;
		const length = core.utils.filter.checks(def.checks, 'length');

		if (length) {
			min = length.value;
			max = length.value;
		}

		if (min < 0)
			throw new Error(
				`Minimum length of a string can't be less than 0: ${min}`
			);

		return formatString(core, def, core.utils.random.string({ min, max }));
	},
});

export const UrlGenerator = Generator({
	schema: ZodString,
	matches: ({ def, core }) =>
		core.utils.filter.checks(def.checks, 'url') !== undefined,
	output: ({ def, core }) => {
		return formatString(core, def, `https://${core.utils.random.lorem(1)}.com`);
	},
});

export const UuidGenerator = Generator({
	schema: ZodString,
	matches: ({ def, core }) =>
		core.utils.filter.checks(def.checks, 'uuid') !== undefined,
	output: ({ def, core }) => formatString(core, def, core.utils.random.uuid()),
});

export const EmailGenerator = Generator({
	schema: ZodString,
	matches: ({ def, core }) =>
		core.utils.filter.checks(def.checks, 'email') !== undefined,
	output: ({ def, core }) => formatString(core, def, 'rando@email.com'),
});

export const CuidGenerator = Generator({
	schema: ZodString,
	matches: ({ def, core }) =>
		core.utils.filter.checks(def.checks, 'cuid') !== undefined,
	output: () => {
		throw new Error(`cuid has been deprecated in favor of cuid2`);
	},
});

export const Cuid2Generator = Generator({
	schema: ZodString,
	matches: ({ def, core }) =>
		core.utils.filter.checks(def.checks, 'cuid2') !== undefined,
	output: ({ def, core }) => formatString(core, def, core.utils.random.cuid2()),
});
