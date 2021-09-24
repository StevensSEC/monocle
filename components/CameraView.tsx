import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Camera } from "expo-camera";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as FileSystem from "expo-file-system";

import PhotoButton from "../components/PhotoButton";
import { base64ImageToTensor } from "../util/image";
import { GOCR } from "../util/gocr.js";

const CameraView = (): JSX.Element => {
	const [ref, setRef] = useState<Camera | null>();
	const [lastImageURI, setLastImageURI] = useState<string>();
	const [objectDetectionPreidictions, setObjectDetectionPreidictions] =
		useState<cocoSsd.DetectedObject[]>();
	const [status, setStatus] = useState<string>("Waiting for image");
	const [objDetectModel, setObjDetectModel] = useState<cocoSsd.ObjectDetection>();

	const onPressPhotoButton = async (): Promise<void> => {
		try {
			const picture = await ref?.takePictureAsync();
			if (!picture?.uri) {
				throw new Error("No picture");
			}
			setLastImageURI(picture?.uri);

			setStatus("Reading...");
			const buffer = await FileSystem.readAsStringAsync(picture.uri, {
				encoding: FileSystem.EncodingType.Base64,
			});
			setStatus("Processing...");
			const imageTensor: tf.Tensor3D = base64ImageToTensor(buffer);

			setStatus("Detecting objects...");
			const predictions = await objDetectModel?.detect(imageTensor);
			setObjectDetectionPreidictions(predictions);

			setStatus("Reading text...");
			const data = {
				data: Uint8ClampedArray.from((await imageTensor.array()).flat(2)),
				height: imageTensor.shape[0],
				width: imageTensor.shape[1],
			};
			const text = GOCR(data);

			setStatus(`objects: ${JSON.stringify(objectDetectionPreidictions)} text: ${text}`);
		} catch (e) {
			if (e instanceof Error) {
				setStatus(`Error: ${e.message}`);
			}
			throw e;
		}
	};

	useEffect((): void => {
		void (async (): Promise<void> => {
			const permission = await Camera.getCameraPermissionsAsync();
			if (!permission.granted) {
				while (true) {
					const response = await Camera.requestCameraPermissionsAsync();
					if (response.canAskAgain && !response.granted) {
						continue;
					}
					break;
				}
			}

			setStatus("Waiting for tensorflow to be ready...");
			await tf.ready();

			if (!objDetectModel) {
				setStatus("Loading object detection model...");
				const objectDetection = await cocoSsd.load();
				setObjDetectModel(objectDetection);

				setStatus("Waiting for image");
			}
		})();
	}, []);

	return (
		<View style={styles.container}>
			<Camera
				ref={ref => {
					setRef(ref);
				}}
				style={{ flex: 1 }}
				type={Camera.Constants.Type.back}
			/>
			<PhotoButton onPress={onPressPhotoButton} color="#f4e1e6" />
			{/* FIXME: temporary, remove when we have actual UI */}
			<Text>{lastImageURI}</Text>
			<Text>{status}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		flexGrow: 1,
	},
});

export default CameraView;
