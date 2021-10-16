import express from "express";
import { createWorker } from "tesseract.js";
import multer from "multer";

const worker = createWorker({
	logger: m => console.log(m),
});

let status: string = "starting...";

void (async () => {
	status = "loading tesseract";
	await worker.load();
	await worker.loadLanguage("eng");
	await worker.initialize("eng");
	status = "ready";
})();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// TODO: move these interfaces to a seperate module so that they can be reused on the client side.
interface ResponseSuccess<T = undefined> {
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

export type MonocleApiResponse<T = undefined> = ResponseSuccess<T> | ResponseError;

export const apirouter = express.Router();

apirouter.get("/status", (req, res) => {
	const resp: MonocleApiResponse<string> = {
		success: true,
		result: status,
	};
	res.json(resp);
});

apirouter.post("/upload", upload.single("image"), async (req, res) => {
	if (!req.file || !req.file?.buffer) {
		const resp: MonocleApiResponse = {
			success: false,
			error: {
				name: "MissingImage",
				message: "No image was provided",
			},
		};
		res.json(resp);
		return;
	}
	const result = await worker.recognize(req.file?.buffer);
	const resp: MonocleApiResponse<string> = {
		success: true,
		result: result.data.text,
	};
	res.json(resp);
});
