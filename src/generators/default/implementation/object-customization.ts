import type { Customization } from './customization';

export const objectCustomization = (): Customization<{
	shape: Record<string, { type: string; create: () => unknown }>;
}> => {
	return {
		condition: ({ type }) => type === 'object',
		generator,
	};
};

function generator({
	shape,
}: {
	shape: Record<string, { type: string; create: () => unknown }>;
}): Record<string, unknown> {
	return Object.entries(shape).reduce((aggregate, [key, value]) => {
		return {
			...aggregate,
			[key]: value.create(),
		};
	}, {} as Record<string, unknown>);
}
