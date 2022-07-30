import type { Customization } from './customization';

export const nanCustomization = (): Customization => {
	return {
		condition: ({ type }) => type === 'NaN',
		generator: (): number => {
			return NaN;
		},
	};
};
