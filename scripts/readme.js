import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

const readme = fs.readFileSync('docs/index.md', 'utf-8');

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
			const resolved = path.join('./docs', `.${filepath}`);
			let result = fs.readFileSync(resolved);

			if (region) {
				const open = `\\/\\/ #region ${region}\n`;
				const content = '([\\s\\S]*)';
				const close = `\\/\\/ #endregion ${region}\n`;
				const matcher = new RegExp(`${open}${content}${close}`, 'g');
				const match = matcher.exec(result);

				if (!match) throw new Error(`Region not found: ${filepath}#${region}`);
				result = match[1];
			}

			const href = `https://github.com/timdeschryver/zod-fixture/tree/beta/${resolved}`;
			const label = tab
				? `<sub>[${tab}](${href})</sub>`
				: `<sub>[Source](${href})</sub>`;
			const type = ext?.slice(1) ?? '';
			return `${label}\n\`\`\`${type}\n${result}\n\`\`\``;
		}
	)
	.replace(/\/\/ #(end)?region [\S]+\n?/g, '')
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

const formatted = prettier.format(result, { parser: 'markdown' });

if (readme !== formatted) {
	fs.writeFileSync('README.md', formatted);
	// eslint-disable-next-line no-undef
	process.exit(1);
}
