import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'zod-fixture',
	description: 'Documentation for zod-fixture',
	lang: 'en-US',
	lastUpdated: true,
	cleanUrls: true,
	themeConfig: {
		nav: [],
		sidebar: [],
		search: { provider: 'local' },
		aside: true,
		outline: 'deep',
		lastUpdatedText: 'Last Updated',
		editLink: {
			pattern:
				'https://github.com/timdeschryver/zod-fixture/edit/main/docs/index.md',
		},
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/timdeschryver/zod-fixture' },
		],
	},
});
