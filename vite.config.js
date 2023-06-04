/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	test: ['./src/*'],
	resolve: {
		alias: {
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
			external: ['cuid', '@paralleldrive/cuid2'],
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext',
		},
	},
});
