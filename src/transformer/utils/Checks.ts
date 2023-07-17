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

type FilterChecks<
	T extends { kind: string },
	TKind extends string
> = T extends { kind: TKind } ? T : never;
