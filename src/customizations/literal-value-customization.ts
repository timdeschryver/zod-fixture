import type { Customization } from './customization';

export const literalValueCustomization = (): Customization<{
	value: unknown;
}> => {
	return {
		condition: ({ type }) => type === 'literal',
		generator: ({ value }): unknown => {
			return value;
		},
	};
};
