import type { Customization } from './customization';

export const booleanSequenceCustomization = (): Customization => {
	let toggle = false;

	return {
		condition: ({ type }) => type === 'boolean',
		generator: (): boolean => {
			toggle = !toggle;
			return toggle;
		},
	};
};
