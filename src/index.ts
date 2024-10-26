import { async } from 'fast-glob';
import { AddDtoCreator } from './AddDtoCreator';
import { DepthManager } from './DepthManager';
import { parseFiles } from './file-parser';
import { log, time, timeEnd } from 'console';

(async () => {
	time('Loading entities');
	const allEntities = await async('**/*/*.entity.ts', { absolute: true });
	timeEnd('Loading entities');

	time('Parsing');
	const ASTs = await parseFiles(allEntities);
	timeEnd('Parsing');

	time('Creating dtos');
	for (const ast in ASTs) {
		const addDtoCreator = new AddDtoCreator(
			ASTs[ast].sourceFile,
			ASTs,
			ASTs[ast].fullPath,
			{
				maxDepth: 1,
			}
		);
		await addDtoCreator.build();
		DepthManager.currDepth = 0;
	}
	timeEnd('Creating dtos');
})();
