type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;

export class Checks<TChecks extends { kind: string }[]> {
	constructor(private checks: TChecks) {}

	find<TKind extends string>(
		kind: TKind
	): FilterChecks<TChecks[number], TKind> | undefined {
		return this.checks.find((check) => check.kind === kind) as
			| FilterChecks<TChecks[number], TKind>
			| undefined;
	}

	has<TKind extends string>(kind: TKind) {
		return this.find(kind) !== undefined;
	}
}

type FilterChecks<T extends { kind: string }, TKind extends string> = IfAny<
	T,
	unknown,
	T extends { kind: TKind } ? T : never
>;
