import type { Customization } from './customization';

export const intersectionCustomization = (): Customization<{
	create: () => Record<string, unknown>;
}> => {
	return {
		condition: ({ type }) => type === 'intersection',
		generator,
	};
};

function generator({
	create,
}: {
	create: () => Record<string, unknown>;
}): Record<string, unknown> {
	return create();
}
