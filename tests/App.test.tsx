import React from "react";
import TestRenderer from "react-test-renderer";
import App from "../App";

const tr = TestRenderer.create(<App />);

it("renders something", () => {
	expect(tr.toJSON()).toBeDefined();
});
