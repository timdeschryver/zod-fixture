import type { Customization } from './customization';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop: () => void = () => {};

export const noopCustomization = (): Customization => {
	return {
		condition: ({ type }) => type === 'function' || type === 'void',
		generator: (): (() => unknown) => {
			return noop;
		},
	};
};
