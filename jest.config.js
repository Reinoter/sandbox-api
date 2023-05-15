const { compilerOptions } = require('./tsconfig');
const { pathsToModuleNameMapper } = require('ts-jest');
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/src',
	}),
	moduleDirectories: ['node_modules', 'src'],
	globals: {
		'ts-jest': {
			// ts-jest configuration goes here
			tsconfig: './tsconfig.json',
		},
	},
};
