import type { Customization } from "./customization";

export interface Context {
	path: string[];
	ignoreChecks: boolean;
	customizations: Customization[]
}

export type Condition = Record<string, number>;
export type ConditionBasedGenerator<Result = unknown> = (
	conditions: Condition,
) => Result;
