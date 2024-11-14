import ts from 'typescript';
import { Node, TreeParser } from './TreeParser';
import { readFile, writeFile } from 'fs/promises';
import { dirname, join, relative, sep } from 'path';
import { ASTs } from './lib/types';
import { CreateDtoFieldBuilder } from './CreateDtoFieldBuilder';
import { appModulePath, globalsDirPath as globalsDirPath } from './utils';
import { mkdirSync } from 'fs';

export type CreateDtoInfo = {
	absPath: string;
	className: string;
	entityName: string; //remove entity or model name from it
	fileName: string; //remove entity or model name from it
	savedFileName: string; //remove entity or model name from it
};
export type ServiceFileInfo = {
	serviceClassName: string;
	serviceAbsPath: string;
};
export type ControllerFileInfo = {
	controllerClassName: string;
	controllerAbsPath: string;
};

export type ModuleFileInfo = {
	moduleClassName: string;
	moduleAbsPath: string;
};

export type TypeKeywords = 'One' | 'Many';
export type Relationships = `${TypeKeywords}To${TypeKeywords}`;

export class CreateSchemaCreator {
	parsedTree: Node;
	schemaName: string;
	entityName: string;
	fullEntityName: string;
	entityClass: Node;
	fileName: string;
	imports: Set<string> = new Set();
	absoluteImports: { absPath: string; importedFields: string[] }[] = [];
	enums: string[] = [];
	properties: string[] = [];
	ogFilePath: string;
	maxDepth: number = 1;
	currDepth: number = 0;
	validationsImports: Set<string> = new Set();
	transformationsImports: Set<string> = new Set();
	asts: ASTs;
	dtoDirName: string;
	dtoDirPath: string;
	dtoDirRelPath: string;
	dtoDirAbsPath: string;
	visited: Set<string>;
	parents: Set<string>;
	nested: Record<string, any>;

	constructor(
		ast: ts.SourceFile,
		ogPath: string,
		asts: ASTs,
		{ maxDepth, currDepth } = { currDepth: 0, maxDepth: 1 },
		visited?: Set<string>,
		parents?: Set<string>,
		nested?: Record<string, any>
	) {
		this.parsedTree = TreeParser.parse(ast);
		this.ogFilePath = ogPath;
		this.maxDepth = maxDepth;
		this.currDepth = currDepth;
		this.asts = asts;
		this.dtoDirName = '';
		this.visited = visited ?? new Set();
		this.parents = parents ?? new Set();
		this.nested = nested ?? {};

		this.dtoDirPath = `generated-schemas/${this.dtoDirName}`;
		//this is supposed to be under same module
		//entity should be under main module
		//
		this.dtoDirAbsPath = join(dirname(this.ogFilePath), '..', this.dtoDirPath);
		//make sure the dto directory exists
		mkdirSync(this.dtoDirAbsPath, { recursive: true });

		//relative path to dto directory from entity
		this.dtoDirRelPath = relative(
			this.ogFilePath,
			join(dirname(this.ogFilePath), '..', this.dtoDirPath)
		);
	}

	async build() {
		// let entityName: string = '';
		// if (this.parents.size > 0) {
		// 	entityName = Array.from(this.parents).join('');
		// }
		// console.log(this.parents);
		this._setEntityName();
		this._setSchemaName();
		this._setFilename();
		this._setSavedFilename();
		this._setDefaultImports();
		this._setEnums();
		// console.log(this._parseFields());
		this._traverse();

		// await writeFile(`./tmp/${this.entityName}.ts`, JSON.stringify(this.nested, null, 4));
		//handle fields
		//recursivly parse fields till max depth
	}

	defaultExcludedFields: string[] = [
		'updatedAt',
		'createdAt',
		'updated_at',
		'created_at',
	];

	primitiveTypes: string[] = ['number', 'string', 'boolean', 'bigint'];

	_parseFields() {
		const fields = this.entityClass?.properties || [];
		// let accu = '';
		// if (this.currDepth === 0) {
		// 	accu += `export ${this.schemaName} = `;
		// }
		const all: string[] = [];
		for (const field of fields) {
			if (this.defaultExcludedFields.includes(field.name!)) continue;

			const fieldTypes = field.type!.split('|').map((t) => t.trim());
			const fieldOptional = Boolean(field.optional);
			const fieldPrimitive = fieldTypes.some((t) => this.primitiveTypes.includes(t));
			if (!fieldPrimitive) continue;
			const fieldNullable = fieldTypes.some((t) => t === 'null');
			const fieldUndefinable = fieldTypes.some((t) => t === 'undefined') || fieldOptional;
			let fieldAsString = '';
			// let fieldEnum = false;
			// let fieldNotSupported = false;
			// let includeRelationField: boolean | null = null;

			//construct the json schema
			let typeBoxType = '';
			const unionTypes: string[] = [];

			for (const type of fieldTypes) {
				if (type === 'number') {
					unionTypes.push(`Type.Number()`);
				} else if (type === 'string') {
					unionTypes.push(`Type.String()`);
				} else if (type === 'boolean') {
					unionTypes.push(`Type.Boolean()`);
				}
			}

			if (!unionTypes.length) continue;

			if (fieldUndefinable) {
				unionTypes.push('Type.Undefined()');
			}

			if (fieldNullable) {
				unionTypes.push('Type.Null()');
			}

			if (unionTypes.length > 1) {
				typeBoxType = `Type.Union([${unionTypes.join(', ')}])`;
			} else if (unionTypes.length === 1) {
				typeBoxType = unionTypes[0];
			}

			if (fieldOptional) {
				typeBoxType = `Type.Optional(${typeBoxType})`;
			}

			fieldAsString = `${field.name}: ${typeBoxType}`;
			all.push(fieldAsString);
		}

		const tbObject = `export const ${this.schemaName} = Type.Object({
${all.join(',\n')}
})`;

		return tbObject;
	}

	async _traverse() {
		const fields = this.entityClass?.properties || [];
		for (const field of fields) {
			//keep track of field name
			//keep track of field other side of relation name
			//for each recursive call, check if the
			let enumCol: Node | undefined;
			let relationCol: Node | undefined;
			let relationExtra: Node | undefined;
			let relationHasFk: boolean = false;
			let fieldNotSupported = false;

			field.decorators?.forEach((d) => {
				if (d.text?.startsWith('@Column') && d.text?.includes('enum')) {
					enumCol = d;
				} else if (d.text?.match(/(One|Many)To(One|Many)/)?.length) {
					relationCol = d;
				} else if (d.text?.includes('JoinColumn')) {
					relationExtra = d;
					relationHasFk = true;
				} else if (d.text?.includes('JoinTable')) {
					relationExtra = d;
					//TODO: handle conjuction table
				} else if (d.text?.match(/Tree(Parent|Children)/)?.length) {
					fieldNotSupported = true;
				}
			});

			if (fieldNotSupported) {
				continue;
			}

			// console.log(this.currDepth);

			if (relationCol && this.currDepth < 5) {
				const currKey = `${this.entityName}:${
					field.name
				}:${relationCol.functions?.[0].arrowFn?.[1].def?.split('.').at(-1)}`;
				if (this.visited.has(currKey)) {
					continue;
				}

				this.visited.add(currKey);

				const relationFn = relationCol.functions?.find((f) =>
					[
						'ManyToMany',
						'OneToOne',
						'OneToMany',
						'ManyToOne',
						//TODO: support tree structures
					].includes(f.expression!)
				);

				const relationType = relationFn?.identifiers?.[0].expression as Relationships;
				const relatedClass = relationFn?.arrowFn?.[0]?.identifiers?.[0].expression;
				const fileImport = this.parsedTree.imports?.find(
					(i) => i?.identifiers?.findIndex((id) => id?.expression === relatedClass)! > -1
				) || {
					module: `import { ${relatedClass!} } from '${this.ogFilePath.replaceAll(
						'.ts',
						''
					)}'`,
				};

				if (fileImport) {
					const fileName = fileImport.module?.split('/')?.at(-1)?.replace("'", '');
					if (fileName && this.asts[fileName]) {
						//got the filename of the ast
						//asts contains all the asts of all entities and the keys are the entity file name
						const newFile = new CreateSchemaCreator(
							this.asts[fileName].sourceFile,
							this.asts[fileName].fullPath,
							this.asts,
							{ currDepth: this.currDepth + 1, maxDepth: 1 },
							this.visited,
							this.parents.add(this.entityName.replace('.ts', '')),
							(this.nested[field.name!] = {})
						);

						await newFile.build();
						// console.log(this.nested);
					}
				}
			}
		}

		// console.log(this.nested);
		//
	}

	_setEntityName(name?: string) {
		const entityClass = this.parsedTree.classes?.find((c) =>
			c.decorators?.find((d) => d.text?.startsWith('@Entity'))
		);

		if (!entityClass) throw new Error('no entity class found');
		this.entityClass = entityClass;
		if (name) {
			this.entityName = name.replace(/entity/gi, '').replace(/model/gi, '');
			this.fullEntityName = name;
		} else {
			this.entityName = entityClass.name!.replace(/entity/gi, '').replace(/model/gi, ''); //ie: Category
			this.fullEntityName = entityClass.name!;
		}
	}

	_setSchemaName() {
		const flatName = this.entityName.replace(/entity/gi, '').replace(/model/gi, '');
		this.schemaName = `Create${flatName}Schema`;
		return this.schemaName;
	}

	_setFilename() {
		//Category -> category
		//AdminUser -> admin-user
		this.fileName = this.entityName
			.split('')
			.map((c, i) => (c === c.toUpperCase() && i !== 0 ? `-${c}` : c))
			.join('')
			.toLowerCase();

		return this.fileName;
	}

	_setSavedFilename() {
		this.fileName = `create-${this.fileName}.schema.ts`;
		return this.fileName;
	}

	_setDefaultImports() {
		this.parsedTree.imports?.forEach((i) => {
			i.module = i.module?.replaceAll("'", '');
			if (i.module?.startsWith('.')) {
				//handle relative imports
				const targetDestAbs = join(dirname(this.ogFilePath), i.module);
				//save the absolute path to the file to later get relative path to it in the new schema/dto file
				this.absoluteImports.push({
					absPath: targetDestAbs.replaceAll('.ts', ''),
					importedFields: i.identifiers?.map((i) => i.expression!)!,
				});
			} else if (i.module === 'typeorm') {
				//do nothing
			} else {
				//project can contain non-relative path so leave them as is
				this.imports.add(i.text?.replaceAll('.ts', '')!);
			}
		});

		this.imports?.add("import { Type } from '@sinclair/typebox';");
		this.imports?.add("import { TypeCompiler } from '@sinclair/typebox/compiler';");
	}

	_setEnums() {
		//enums should be exported from the db file
		this.parsedTree.enums?.forEach((e, i) => {
			if (e.text?.startsWith('export')) {
				//make an import statement
				const enumKey = e.identifiers?.[0]?.expression;
				if (enumKey) {
					const importStmnt = `import { ${enumKey} } from '<<pathToOriginal>>'`;
					this.imports.add(importStmnt);
				}
			} else {
				this.enums.push(e.text!);
			}
		});
	}
}
