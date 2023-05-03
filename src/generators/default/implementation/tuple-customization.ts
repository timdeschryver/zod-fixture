import type { Customization } from './customization';

export const tupleCustomization = (): Customization<{
	items: string[];
	create: () => unknown[];
}> => {
	return {
		condition: ({ type }) => type === 'tuple',
		generator: ({ create }): unknown[] => {
			return create();
		},
	};
};
