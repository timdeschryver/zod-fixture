const DEFAULT_LIST_SIZE = 3;

export default {
	array: {
		min: DEFAULT_LIST_SIZE,
		max: DEFAULT_LIST_SIZE,
	},
	map: {
		min: DEFAULT_LIST_SIZE,
		max: DEFAULT_LIST_SIZE,
	},
	set: {
		min: DEFAULT_LIST_SIZE,
		max: DEFAULT_LIST_SIZE,
	},
	int: {
		min: Number.MIN_SAFE_INTEGER,
		max: Number.MAX_SAFE_INTEGER,
	},
	float: {
		min: Number.MIN_SAFE_INTEGER,
		max: Number.MAX_SAFE_INTEGER,
	},
	bigint: {
		min: BigInt(Number.MIN_SAFE_INTEGER),
		max: BigInt(Number.MAX_SAFE_INTEGER),
	},
	date: {
		min: Date.UTC(1900, 0, 1),
		max: Date.UTC(2100, 11, 31),
	},
} satisfies ZodFixture.Defaults;
