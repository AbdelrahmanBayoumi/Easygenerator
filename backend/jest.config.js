module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/src'],
	testRegex: '.spec.ts$',
	moduleFileExtensions: ['js', 'json', 'ts'],
	coverageDirectory: './coverage',
	collectCoverageFrom: ['**/*.(t|j)s'],
	coverageThreshold: {
		global: {
			branches: 70,
			functions: 85,
			lines: 85,
			statements: 85,
		},
	},
	testTimeout: 30000,
};
