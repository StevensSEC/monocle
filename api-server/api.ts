import express from "express";

export const apirouter = express.Router();
apirouter.get("/", (req, res) => {
	res.send("Hello World!");
});
