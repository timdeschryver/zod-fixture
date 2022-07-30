import type { Customization } from './customization';

const nullableTypes = ['null', 'any', 'unknown', 'never'];
export const nullCustomization = (): Customization => {
	return {
		condition: ({ type }) => nullableTypes.includes(type),
		generator: (): null => {
			return null;
		},
	};
};
