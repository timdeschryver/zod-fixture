import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'zod-fixture',
	description: 'Documentation for zod-fixture',
	base: '/zod-fixture/',
	lang: 'en-US',
	lastUpdated: true,
	cleanUrls: true,
	srcDir: '..',
	themeConfig: {
		nav: [],
		sidebar: [],
		search: { provider: 'local' },
		editLink: {
			pattern:
				'https://github.com/timdeschryver/zod-fixture/edit/main/docs/README.md',
		},
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/timdeschryver/zod-fixture' },
		],
	},
});
