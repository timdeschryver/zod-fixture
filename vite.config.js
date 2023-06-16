/// <reference types="vitest" />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
	test: ['./src/*'],
	resolve: {
		alias: {
			// eslint-disable-next-line no-undef
			'@': path.resolve(__dirname, './src'),
		},
	},
	plugins: [
		dts({
			insertTypesEntry: true,
		}),
	],
	build: {
		target: 'esnext',
		lib: {
			entry: './src/index.ts',
			name: 'zod-fixture',
			formats: ['es', 'umd'],
			fileName: format =>
				`zod-fixture.${format}.${format === 'umd' ? 'cjs' : 'js'}`,
		},
		rollupOptions: {
			external: ['@paralleldrive/cuid2'],
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext',
		},
	},
});
