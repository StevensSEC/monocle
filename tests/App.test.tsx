import React from "react";
import TestRenderer from "react-test-renderer";
import { cleanup } from "@testing-library/react-native";
import App from "../App";

afterEach(cleanup);

const tr = TestRenderer.create(<App />);

it("renders something", () => {
	expect(tr.toJSON()).toBeDefined();
});
