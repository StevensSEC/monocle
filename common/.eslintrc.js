module.exports = {
	root: true,
	plugins: ["@typescript-eslint"],
	env: {
		node: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 6,
		sourceType: "module",
		ecmaFeatures: {
			jsx: false,
		},
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	extends: ["plugin:@typescript-eslint/recommended"],
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
		"no-console": "warn",
		"no-debugger": "error",
		"no-var": "error",
		"eqeqeq": "error",
		"prettier/prop-types": "off",
		"@typescript-eslint/no-var-requires": "error",
		"@typescript-eslint/adjacent-overload-signatures": "error",
		"@typescript-eslint/no-extra-semi": "off",
	},
};
