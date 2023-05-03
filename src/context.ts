import type { Customization } from './generators/default/implementation';

export interface Context {
	path: string[];
	customizations: Customization[];
	ignoreChecks: boolean;
	defaultLength: number;
}

export type Condition = Record<string, number>;
