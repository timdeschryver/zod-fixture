import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		dts({
			insertTypesEntry: true,
		}),
	],
	build: {
		lib: {
			entry: './src/index.ts',
			name: 'zod-fixture',
			formats: ['es', 'umd'],
			fileName: format => `zod-fixture.${format}.js`,
		},
		rollupOptions: {
			external: ['cuid', '@paralleldrive/cuid2'],
		},
	},
});
