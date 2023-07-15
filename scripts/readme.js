import fs from 'fs';
import argv from 'minimist';
import path from 'path';
import prettier from 'prettier';

const SOURCE = 'docs/index.md';

// eslint-disable-next-line no-undef
const args = argv(process.argv.slice(2), {
	boolean: true,
	alias: { w: 'watch' },
});

if (args.watch) {
	// eslint-disable-next-line no-undef
	console.log(`Watching ${SOURCE} for changes...`);
	fs.watch(SOURCE, async () => {
		const updated = await updateIfDifferent();
		if (updated) {
			// eslint-disable-next-line no-undef
			console.log('README.md updated!');
		}
	});
} else {
	const updated = await updateIfDifferent();
	// eslint-disable-next-line no-undef
	if (updated) process.exit(1);
}

async function updateIfDifferent() {
	const readme = fs.readFileSync(SOURCE, 'utf-8');

	const headers = readme.match(/(?<!\S)(#+)\s*([^\n]+)/g);
	const table_of_contents = headers
		.map((h) =>
			h.replace(/^(#+)\s*(.*)/, (m, prefix, label) => {
				const indent = '  '.repeat(prefix.length - 2);
				return `${indent}- [${label}](#${label
					.toLowerCase()
					.replace(/\s/g, '-')})`;
			})
		)
		.join('\n');

	const result = readme
		.replace(/\[\[toc\]\]/, () => table_of_contents)
		.replace(
			/<<< @((\/[^/ #\s]+)+)(#(\S+))?( \[(\S+)\])?/g,
			(_m, filepath, _base, _r, region, _l, tab) => {
				const ext = path.extname(filepath);
				const resolved = path.join('docs', `.${filepath}`);
				let result = fs.readFileSync(resolved);

				if (region) {
					const open = `([ \t]*)\\/\\/ #region ${region}\n`;
					const content = '([\\s\\S]*)';
					const close = `([ \t]*)\\/\\/ #endregion ${region}\n`;
					const matcher = new RegExp(`${open}${content}${close}`, 'g');
					const match = matcher.exec(result);

					if (!match)
						throw new Error(`Region not found: ${filepath}#${region}`);
					result = match[2].replace(
						new RegExp(`${match[1]}(.*\n)`, 'g'),
						(_, content) => content
					);
				}

				const href = `https://github.com/timdeschryver/zod-fixture/tree/beta/${resolved}`;
				const label = tab
					? `<sub>[${tab}](${href})</sub>`
					: `<sub>[Source](${href})</sub>`;
				const type = ext?.slice(1) ?? '';
				return `${label}\n\`\`\`${type}\n${result}\n\`\`\``;
			}
		)
		.replace(/\s*\/\/ #(end)?region [\S]+\n?/g, '')
		.replace(/:::\s+(\S+)\n?([\s\S]*?)\n?:::/g, (m, type, content) => {
			switch (type) {
				case 'info':
					return `> INFO: ${content}`;
				case 'tip':
					return `> TIP: ${content}`;
				default:
					return content;
			}
		});

	const config = await prettier.resolveConfig('README.md');
	const formatted = prettier.format(result, { ...config, parser: 'markdown' });
	const existing = fs.readFileSync('README.md');

	const hasChanged = existing.toString() !== formatted;

	if (hasChanged) fs.writeFileSync('README.md', formatted);

	return hasChanged;
}
