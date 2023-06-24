/* eslint-env node */
module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	root: true,
	parserOptions: {
		project: ['tsconfig.json'],
		createDefaultProgram: true,
	},
	rules: {
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{ prefer: 'type-imports' },
		],
	},
};
