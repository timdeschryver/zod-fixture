import type { Customization } from './customization';

const default_min = 1;
const default_max = 500;

export const numberRandomizeCustomization = (
	min = default_min,
	max = default_max,
): Customization => {
	if (min > max) {
		throw new Error(`min ${min} can't be greater max ${max}`);
	}

	return {
		condition: ({ type, checks = {} }) =>
			type === 'number' &&
			checks['min'] === undefined &&
			checks['max'] === undefined,
		generator: (): number => numberRandomizer(min , max),
	};
};

export const numberRandomizeZodSchemaCustomization = (): Customization => {
	return {
		condition: ({ type, checks = {} }) =>
			type === 'number' &&
			(checks['min'] !== undefined || checks['max'] !== undefined),
		generator: ({ checks = {} }): number => {
			const min = checks['min'];
			const max = checks['max'];

			if (min > max) {
				throw new Error(`min ${min} can't be greater max ${max}`);
			}


			const correctedMax = max ?? min + default_max;
			const correctedMin = min ?? correctedMax - default_max;
			return numberRandomizer(correctedMin, correctedMax)
		},
	};
};

export function numberRandomizer(min: number, max:number): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
}