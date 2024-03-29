import path from 'path';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		alias: {
			// eslint-disable-next-line no-undef
			'@': path.resolve(__dirname, './src'),
			'zod-fixture': path.resolve(__dirname, './src/public.ts'),
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
			entry: './src/public.ts',
			name: 'zod-fixture',
			formats: ['es', 'umd'],
			fileName: (format) =>
				`zod-fixture.${format}.${format === 'umd' ? 'cjs' : 'js'}`,
		},
		rollupOptions: {
			external: ['randexp'],
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext',
		},
	},
	test: {
		setupFiles: ['./.vitest/extend.ts'],
	},
});
