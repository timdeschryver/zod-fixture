import type { Customization } from './customization';

export const undefinedCustomization = (): Customization => {
	return {
		condition: ({ type }) => type === 'undefined',
		generator: (): undefined => {
			return undefined;
		},
	};
};
