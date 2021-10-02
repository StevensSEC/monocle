import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	preset: "jest-expo/universal",
	transformIgnorePatterns: [
		"node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)",
	],
	testEnvironment: "node",
};

export default config;
