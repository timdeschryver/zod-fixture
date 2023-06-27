import type { Customization } from './customizations';

export interface Context {
	path: string[];
	customizations: Customization[];
	ignoreChecks: boolean;
	defaultLength: number;
}

export type Condition = Record<string, number>;
