module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	ignorePatterns: ['dist'],
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:import/recommended',
		'plugin:import/typescript',
	],
	rules: {
		'sort-imports': 'error',
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{ prefer: 'type-imports' },
		],
	},
};
