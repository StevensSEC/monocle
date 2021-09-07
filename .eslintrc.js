module.exports = {
	root: true,
	plugins: ["react", "prettier", "@typescript-eslint"],
	env: {
		browser: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 6,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	extends: [
		"plugin:react/recommended",
		"prettier",
		"plugin:prettier/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
			parserOptions: {
				project: ["./tsconfig.json"],
			},
			rules: {
				"@typescript-eslint/switch-exhaustiveness-check": "error",
			},
		},
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
				object: "document",
				property: "title",
			},
		],
		"react/no-unescaped-entities": "warn",
		"prettier/prop-types": "off",
		"react/prefer-stateless-function": "error",
		"@typescript-eslint/no-var-requires": "error",
		"@typescript-eslint/adjacent-overload-signatures": "error",
		"@typescript-eslint/no-extra-semi": "off",
	},
};
