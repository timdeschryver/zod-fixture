declare namespace Utils {
	type FilterChecks<
		T extends { kind: string },
		TKind extends string,
	> = T extends { kind: TKind } ? T : never;

	export { FilterChecks };
}
