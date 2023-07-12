declare namespace ZodFixture {
	interface Defaults {
		seed: number;
		prettify?: true;
		array: {
			min: number;
			max: number;
		};
		map: {
			min: number;
			max: number;
		};
		set: {
			min: number;
			max: number;
		};
		int: {
			min: number;
			max: number;
		};
		float: {
			min: number;
			max: number;
		};
		bigint: {
			min: bigint;
			max: bigint;
		};
		date: {
			min: number;
			max: number;
		};
		string: {
			min?: number;
			max?: number;
			characterSet: string;
		};
	}

	export { Defaults };
}
