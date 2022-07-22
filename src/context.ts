export interface Context {
	path: string[];
}

export type Condition = Record<string, number>;
export type ConditionBasedGenerator<Result = unknown> = (
	conditions: Condition,
) => Result;
