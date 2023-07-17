import fs from 'fs/promises';
import path from 'path';
import { expect, test } from 'vitest';
import { DEFAULT_FIXTURE_GENERATORS } from '.';

test('all generators should be accounted for', async () => {
	let tally = 0;
	const entities = await fs.readdir(__dirname);
	const scans = entities.map(async (entity) => {
		const entityPath = path.join(__dirname, entity);
		const stat = await fs.lstat(entityPath);
		if (stat.isFile()) return;

		const filePath = path.join(entityPath, 'index.ts');
		const contents = await fs.readFile(filePath);
		const generators = contents
			.toString()
			.match(/export const (\S+)Generator/g);

		if (generators) tally += generators.length;
	});

	await Promise.all(scans);

	expect(tally).toBe(DEFAULT_FIXTURE_GENERATORS.length);
});
