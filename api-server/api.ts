import express from "express";
import { createWorker } from "tesseract.js";
import multer from "multer";
import type { MonocleApiResponse } from "../common/api";

const worker = createWorker({
	logger: m => console.log(m),
});

let status = "starting...";

void (async () => {
	status = "loading tesseract";
	await worker.load();
	await worker.loadLanguage("eng");
	await worker.initialize("eng");
	status = "ready";
})();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } });

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
