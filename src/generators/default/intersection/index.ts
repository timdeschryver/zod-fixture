import { Generator } from '@/core/generator';
import { ZodIntersection, ZodParsedType, getParsedType, util } from 'zod';

export const IntersectionGenerator = Generator({
	schema: ZodIntersection,
	matches: () => true,
	output: ({ def, core }) => {
		const left = core.generate(def.left);
		const right = core.generate(def.right);
		const result = mergeValues(left, right);

		if (!result.valid) throw new Error('Intersection is not valid.');
		return result.data;
	},
});

/**
 * Merge strategy copied from Zod itself.
 */
function mergeValues(
	a: any,
	b: any,
): { valid: true; data: any } | { valid: false } {
	const aType = getParsedType(a);
	const bType = getParsedType(b);

	if (a === b) {
		return { valid: true, data: a };
	} else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
		const bKeys = util.objectKeys(b);
		const sharedKeys = util
			.objectKeys(a)
			.filter(key => bKeys.indexOf(key) !== -1);

		const newObj: any = { ...a, ...b };
		for (const key of sharedKeys) {
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) {
				return { valid: false };
			}
			newObj[key] = sharedValue.data;
		}

		return { valid: true, data: newObj };
	} else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
		if (a.length !== b.length) {
			return { valid: false };
		}

		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues(itemA, itemB);

			if (!sharedValue.valid) {
				return { valid: false };
			}

			newArray.push(sharedValue.data);
		}

		return { valid: true, data: newArray };
	} else if (
		aType === ZodParsedType.date &&
		bType === ZodParsedType.date &&
		+a === +b
	) {
		return { valid: true, data: a };
	} else {
		return { valid: false };
	}
}
