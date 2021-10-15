import express, { Express } from "express";
import { apirouter } from "./api";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const app = express() as Express;
app.use("/api", apirouter);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
	console.log(`monocle api-server listening on ${port}`);
});
