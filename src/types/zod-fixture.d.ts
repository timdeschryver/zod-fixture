declare namespace ZodFixture {
	// #region defaults
	interface Defaults {
		array: {
			min: number; // 3
			max: number; // 3
		};
		map: {
			min: number; // 3
			max: number; // 3
		};
		set: {
			min: number; // 3
			max: number; // 3
		};
		int: {
			min: number; // Number.MIN_SAFE_INTEGER
			max: number; // Number.MAX_SAFE_INTEGER
		};
		float: {
			min: number; // Number.MIN_SAFE_INTEGER
			max: number; // Number.MAX_SAFE_INTEGER
		};
		bigint: {
			min: bigint; // BigInt(Number.MIN_SAFE_INTEGER)
			max: bigint; // BigInt(Number.MAX_SAFE_INTEGER)
		};
		date: {
			min: number; // Date.UTC(1900, 0, 1)
			max: number; // Date.UTC(2100, 11, 31)
		};
	}
	// #endregion defaults

	// #region config
	interface TransformerConfig {
		seed?: number;
		defaults?: Partial<Defaults>;
	}
	// #endregion config

	export { Defaults, TransformerConfig };
}
