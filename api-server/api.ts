import express from "express";
import { createWorker } from "tesseract.js";

const worker = createWorker({
	logger: m => console.log(m),
});

void (async () => {
	await worker.load();
	await worker.loadLanguage("eng");
	await worker.initialize("eng");
	const {
		data: { text },
	} = await worker.recognize("https://tesseract.projectnaptha.com/img/eng_bw.png");
	console.log(text);
	await worker.terminate();
})();

// TODO: move these interfaces to a seperate module so that they can be reused on the client side.
interface ResponseSuccess<T> {
	success: true;
	result: T;
}

interface ResponseError {
	success: false;
	error: {
		name: string;
		message: string;
	};
}

export type MonocleApiResponse<T> = ResponseSuccess<T> | ResponseError;

export const apirouter = express.Router();
apirouter.post("/upload", (req, res) => {
	res.send("Hello World!");
});
