import type { Customization } from './customization';

export const randomValueOfPossiblesCustomication = (): Customization<{
	possibleValues: unknown[];
}> => {
	return {
		condition: ({ type }) => type === 'enum',
		generator: ({ possibleValues }): unknown => {
			return possibleValues[Math.floor(Math.random() * possibleValues.length)];
		},
	};
};
