module.exports = {
	root: true,
	plugins: [
		"react",
		"prettier",
	],
	env: {
		browser: true,
	},
	parserOptions: {
		ecmaVersion: 6,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		}
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	extends: [
		"plugin:react/recommended",
		"prettier",
	],
	// Do NOT use any eslint ruels that affect code formatting because prettier handles that.
	rules: {
		"no-console": "error",
		"no-debugger": "error",
		"no-var": "error",
		"eqeqeq": "error",
		"no-restricted-properties": [
			"error",
			{
				"object": "document",
				"property": "title",
			},
		],
		"react/no-unescaped-entities": "warn",
		"prettier/prop-types": "off",
		"react/prefer-stateless-function": "error",
	}
}