import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Camera } from "expo-camera";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as FileSystem from "expo-file-system";

import PhotoButton from "../components/PhotoButton/PhotoButton";
import { base64ImageToTensor } from "../util/image";

const CameraView = (): JSX.Element => {
	const [ref, setRef] = useState<Camera | null>();
	const [lastImageURI, setLastImageURI] = useState<string>();
	const [objectDetectionPreidictions, setObjectDetectionPreidictions] =
		useState<cocoSsd.DetectedObject[]>();
	const [status, setStatus] = useState<string>("Waiting for image");

	const onPressPhotoButton = async (): Promise<void> => {
		const picture = await ref?.takePictureAsync();
		setLastImageURI(picture?.uri);

		setStatus("Processing...");
		const buffer = await FileSystem.readAsStringAsync(picture?.uri ?? "", {
			encoding: FileSystem.EncodingType.Base64,
		});
		const imageTensor: tf.Tensor3D = base64ImageToTensor(buffer);

		setStatus("Loading object detection model...");
		const objectDetection = await cocoSsd.load();
		setStatus("Detecting objects...");
		const predictions = await objectDetection.detect(imageTensor);
		setObjectDetectionPreidictions(predictions);
		setStatus(`objects: ${JSON.stringify(objectDetectionPreidictions)}`);
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

			await tf.ready();
		})();
	});

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
