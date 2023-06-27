import type { Condition } from '../context';

export type CustomizationRequest<
	Properties extends Record<string, unknown> = Record<string, unknown>,
> = {
	propertName?: string;
	type: string;
	checks?: Condition;
} & Properties;

export type Customization<
	Properties extends Record<string, unknown> = Record<string, unknown>,
> = {
	condition: (request: CustomizationRequest<Properties>) => boolean;
	generator: (request: CustomizationRequest<Properties>) => unknown;
};
