import type { Customization } from './customization';

export const unionRandomizeCustomization = (): Customization<{
	possibleTypes: string[];
	create: (type: string) => unknown;
}> => {
	return {
		condition: ({ type }) => type === 'union',
		generator: ({ create, possibleTypes: options }): unknown => {
			const type = options[Math.floor(Math.random() * options.length)];
			return create(type);
		},
	};
};
