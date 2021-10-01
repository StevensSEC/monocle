import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CameraView from "./components/CameraView";
import * as FileSystem from "expo-file-system";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

import { base64ImageToTensor } from "./util/image";

export default function App(): JSX.Element {
	const [status, setStatus] = useState<string>("Waiting for image");
	const [objectDetectionPreidictions, setObjectDetectionPreidictions] =
		useState<cocoSsd.DetectedObject[]>();
	const [objDetectModel, setObjDetectModel] = useState<cocoSsd.ObjectDetection>();

	const processImage = async (uri: string) => {
		try {
			setStatus("Reading...");
			const buffer = await FileSystem.readAsStringAsync(uri, {
				encoding: FileSystem.EncodingType.Base64,
			});
			setStatus("Processing...");
			const imageTensor: tf.Tensor3D = base64ImageToTensor(buffer);

			setStatus("Detecting objects...");
			const predictions = await objDetectModel?.detect(imageTensor);
			setObjectDetectionPreidictions(predictions);
			setStatus(`objects: ${JSON.stringify(objectDetectionPreidictions)}`);
		} catch (e) {
			if (e instanceof Error) {
				setStatus(`Error: ${e.message}`);
			}
			throw e;
		}
	};

	useEffect(() => {
		setStatus("Waiting for tensorflow to be ready...");
		void (async (): Promise<void> => {
			await tf.ready();

			if (!objDetectModel) {
				setStatus("Loading object detection model...");
				const objectDetection = await cocoSsd.load();
				setObjDetectModel(objectDetection);

				setStatus("Waiting for image");
			}
		})();
	});

	return (
		<View style={styles.container}>
			<CameraView processImage={processImage} />
			<StatusBar style="auto" />
			<Text>{status}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
