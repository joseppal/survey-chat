module.exports = {
	globals: {
		'ts-jest': {
			tsConfigFile: 'server/tsconfig.json'
		}
  },
  rootDir: '../',
	moduleFileExtensions: [
		'ts',
		'js'
	],
	transform: {
		'^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js'
	},
	testMatch: [
		'**/test/**/*.test.(ts|js)'
	],
	testEnvironment: 'node'
};
