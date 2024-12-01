import ts from 'typescript';
import { Node, TreeParser } from './TreeParser';
import { readFile, writeFile } from 'fs/promises';
import { dirname, join, relative, sep } from 'path';
import { ASTs } from './lib/types';
import { appModulePath, globalsDirPath as globalsDirPath } from './utils';
import { CreateSchemaCreator } from './CreateSchemaCreator';
import { UpdateSchemaCreator } from './UpdateSchemaCreator';
import { ReadSchemaCreator } from './ReadSchemaCreator';

export type SchemaInfo = {
	absPath: string;
	schemaName: string;
	inputType: string;
	outputType: string;
	fileName: string;
	entityName: string;
	fullEntityName: string;
	savedFileName: string;
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

export class ModuleCreator {
	private dtoDirName: string;
	private dtoDirPath: string;
	private dtoDirAbsPath: string;
	private dtoDirRelPath: string;

	constructor(private entityPath: string, private entitySourceFile: ts.SourceFile, private asts: ASTs) {
		this._prepDir();
	}

	_prepDir() {
		this.dtoDirName = '';
		this.dtoDirPath = `generated-schemas/${this.dtoDirName}`;
		this.dtoDirAbsPath = join(dirname(this.entityPath), '..', this.dtoDirPath);
		this.dtoDirRelPath = relative(this.entityPath, this.dtoDirAbsPath).split(sep).join('/');
	}

	async build() {
		//build create,update,read schemas
		//create serivce, controller, and module for all of them

		const c = new CreateSchemaCreator(this.entitySourceFile, this.entityPath, this.asts);
		const u = new UpdateSchemaCreator(this.entitySourceFile, this.entityPath, this.asts);
		const r = new ReadSchemaCreator(this.entitySourceFile, this.entityPath, this.asts);
		r.baseSetup();

		const [create, update, read] = await Promise.all([c.buildFile(), u.buildFile(), r.build()]);

		const service = await this._createService(create, update, read);
		// const controller = await this._createController(dto, service);
		// const module = await this._createModule(dto, service, controller);

		//add module to generated-modules.ts
		// await this.addToEntry(module);
	}

	async addToEntry(module: ModuleFileInfo) {
		let moduleTemplate = await readFile(appModulePath, 'utf8');

		const importsToken = '//imports';
		const modulesToken = '//modules';
		const modulesStart = moduleTemplate.indexOf(modulesToken);
		if (modulesStart === -1) {
			throw new Error('Malformed generated module file');
		}

		const moduleName = '\nGenerated' + module.moduleClassName + ',';
		moduleTemplate = ''.concat(
			moduleTemplate.slice(0, modulesStart + modulesToken.length),
			moduleName,
			moduleTemplate.slice(modulesStart + modulesToken.length)
		);

		const importsStart = moduleTemplate.indexOf(importsToken);
		if (importsStart === -1) {
			throw new Error('Malformed generated module file');
		}
		const importStr =
			`\nimport { ${module.moduleClassName} as Generated${module.moduleClassName} } from "./` +
			relative(dirname(appModulePath), module.moduleAbsPath).split(sep).join('/').replace('.ts', '') +
			'";';

		moduleTemplate = ''.concat(
			moduleTemplate.slice(0, importsStart + importsToken.length),
			importStr,
			moduleTemplate.slice(importsStart + importsToken.length)
		);

		await writeFile(appModulePath, moduleTemplate);
	}

	async _createService(create: SchemaInfo, update: SchemaInfo, read: SchemaInfo) {
		let serviceTemplate = await readFile(join(process.cwd(), 'templates/service.template'), 'utf8');
		const imports = new Set();
		imports.add(`import { Injectable } from '@nestjs/common'`);
		imports.add(`import { DataSource } from 'typeorm'`);
		imports.add(`import { AbstractService } from '../globals/services/abstract-service'`);

		imports.add(
			`import ${create.schemaName}, { ${create.inputType}, ${create.outputType} } from './${
				this.dtoDirPath
			}/${create.savedFileName?.replace('.ts', '')}'`
		);
		imports.add(
			`import ${update.schemaName}, { ${update.inputType}, ${update.outputType} } from './${
				this.dtoDirPath
			}/${update.savedFileName?.replace('.ts', '')}'`
		);
		imports.add(
			`import ${read.schemaName}, { ${read.inputType}, ${read.outputType} } from './${
				this.dtoDirPath
			}/${read.savedFileName?.replace('.ts', '')}'`
		);
		imports.add(
			`import { ${create.fullEntityName} } from './entities/${this.entityPath.split('/').at(-1)?.replace('.ts', '')}'`
		);

		//add dto class import
		serviceTemplate = serviceTemplate.replace('<<imports>>', Array.from(imports).join('\n'));

		const name = create.fileName;

		const serviceClassName = create.entityName + 'Service';
		serviceTemplate = serviceTemplate.replace('<<serviceClass>>', serviceClassName);

		//add service file
		const defaultConstructor = `constructor(private datasource: DataSource, private service: AbstractService){}`;
		serviceTemplate = serviceTemplate.replace('<<classConstructor>>', defaultConstructor);

		const createMethod = `
			async createRow(body: ${create.outputType}){
				return await this.service.create(${read.fullEntityName}, body);
			}

			async updateRow(id: number, body: ${update.outputType}){
				return await this.service.update(${read.fullEntityName}, id, body);
			}

			async readRows(query: ${read.outputType}){
				return await this.service.read(${read.fullEntityName}, query);
			}
		`;

		const methods = new Set();
		methods.add(createMethod);
		serviceTemplate = serviceTemplate.replace('<<classMethods>>', Array.from(methods).join('\n'));

		serviceTemplate = serviceTemplate.replace('<<classProperties>>', '');

		const serviceAbsPath = join(this.entityPath, '../..', 'generated-' + name + '.service.ts');

		await writeFile(serviceAbsPath, serviceTemplate);
		return {
			serviceClassName,
			serviceAbsPath: serviceAbsPath.split(sep).join('/'),
		};
	}

	// async _createController(addDtoInfo: SchemaInfo, serviceFileInfo: ServiceFileInfo) {
	// 	let controllerTemplate = await readFile(join(process.cwd(), 'templates/controller.template'), 'utf8');
	// 	const imports = new Set();
	// 	imports.add(`import { Controller, Post, Body } from '@nestjs/common';`);
	// 	imports.add(
	// 		`import { ${addDtoInfo.className} } from './${this.dtoDirPath}/${addDtoInfo.savedFileName?.replace('.ts', '')}'`
	// 	);
	// 	imports.add(
	// 		`import { ${serviceFileInfo.serviceClassName} } from './${serviceFileInfo.serviceAbsPath
	// 			.split('/')
	// 			.at(-1)
	// 			?.replace('.ts', '')}'`
	// 	);

	// 	//add dto class import
	// 	controllerTemplate = controllerTemplate.replace('<<imports>>', Array.from(imports).join('\n'));

	// 	const name = addDtoInfo.fileName.toLowerCase().replace('-entity', '').replace('-model', '');
	// 	controllerTemplate = controllerTemplate.replace('<<routeName>>', `'${name}'`);

	// 	const className = addDtoInfo.entityName.replace('Entity', '').replace('Model', '');
	// 	const controllerClassName = className + 'Controller';
	// 	controllerTemplate = controllerTemplate.replace('<<controllerClass>>', controllerClassName);

	// 	//add service file
	// 	const defaultConstructor = `constructor(private service: ${serviceFileInfo.serviceClassName}){}`;
	// 	controllerTemplate = controllerTemplate.replace('<<classConstructor>>', defaultConstructor);

	// 	const createMethod = `
	// 		@Post()
	// 		async create(@Body() body: ${addDtoInfo.className}){
	// 			return this.service.createRow(body);
	// 		}
	// 	`;
	// 	const methods = new Set();
	// 	methods.add(createMethod);
	// 	controllerTemplate = controllerTemplate.replace('<<classMethods>>', Array.from(methods).join('\n'));

	// 	controllerTemplate = controllerTemplate.replace('<<classProperties>>', '');

	// 	const controllerAbsPath = join(this.entityPath, '../..', 'generated-' + name + '.controller.ts');

	// 	await writeFile(controllerAbsPath, controllerTemplate);
	// 	return {
	// 		controllerAbsPath: controllerAbsPath.split(sep).join('/'),
	// 		controllerClassName,
	// 	};
	// }

	// async _createModule(
	// 	addDtoInfo: SchemaInfo,
	// 	serviceFileInfo: ServiceFileInfo,
	// 	controllerFileInfo: ControllerFileInfo
	// ) {
	// 	let moduleTemplate = await readFile(join(process.cwd(), 'templates/module.template'), 'utf8');
	// 	const imports = new Set();
	// 	imports.add(`import { Module } from '@nestjs/common';`);
	// 	imports.add(
	// 		`import { ${serviceFileInfo.serviceClassName} } from './${serviceFileInfo.serviceAbsPath
	// 			.split('/')
	// 			.at(-1)
	// 			?.replace('.ts', '')}'`
	// 	);
	// 	imports.add(
	// 		`import { ${controllerFileInfo.controllerClassName} } from './${controllerFileInfo.controllerAbsPath
	// 			.split('/')
	// 			.at(-1)
	// 			?.replace('.ts', '')}'`
	// 	);

	// 	moduleTemplate = moduleTemplate.replace('<<imports>>', Array.from(imports).join('\n'));

	// 	moduleTemplate = moduleTemplate.replace('<<moduleImports>>', '');
	// 	moduleTemplate = moduleTemplate.replace('<<moduleControllers>>', controllerFileInfo.controllerClassName);
	// 	moduleTemplate = moduleTemplate.replace('<<moduleProviders>>', serviceFileInfo.serviceClassName);
	// 	moduleTemplate = moduleTemplate.replace('<<moduleExports>>', serviceFileInfo.serviceClassName);

	// 	const className = addDtoInfo.entityName.replace('Entity', '').replace('Model', '');
	// 	const moduleClassName = className + 'Module';
	// 	moduleTemplate = moduleTemplate.replace('<<moduleClass>>', moduleClassName);

	// 	const name = addDtoInfo.fileName.toLowerCase().replace('-entity', '').replace('-model', '');

	// 	const moduleAbsPath = join(this.entityPath, '../..', 'generated-' + name + '.module.ts');

	// 	await writeFile(moduleAbsPath, moduleTemplate);
	// 	return { moduleAbsPath: moduleAbsPath.split(sep).join('/'), moduleClassName };
	// }
}