const DEFAULT_LIST_SIZE = 3;
const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

export default {
	// Copied from defaults in MersenneTwister.
	seed: Math.floor(Math.random() * Math.pow(10, 13)),
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
		min: MIN_SAFE_INTEGER,
		max: MAX_SAFE_INTEGER,
	},
	float: {
		min: MIN_SAFE_INTEGER,
		max: MAX_SAFE_INTEGER,
	},
	bigint: {
		min: BigInt(MIN_SAFE_INTEGER),
		max: BigInt(MAX_SAFE_INTEGER),
	},
	date: {
		min: Date.UTC(1900, 0, 1),
		max: Date.UTC(2100, 11, 31),
	},
	string: {
		characterSet:
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.,/\\!@#$%^&*()_+=-{}[]|:;?<>~`\'"',
	},
} satisfies ZodFixture.Defaults;
