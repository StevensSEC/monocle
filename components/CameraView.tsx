/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Camera } from "expo-camera";
import MlkitOcr, { MlkitOcrResult } from "react-native-mlkit-ocr";

const CameraView = (): JSX.Element => {
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
		})();
	});

	let camera: Camera;

	async function takePicture(): Promise<void> {
		if (camera) {
			const picture = await camera.takePictureAsync();
			// eslint-disable-next-line no-console
			console.log(JSON.stringify(Object.keys(picture)));
			// eslint-disable-next-line no-console
			console.log(JSON.stringify(picture.uri));
			// eslint-disable-next-line no-console
			console.log(typeof MlkitOcr.detectFromUri);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const result: MlkitOcrResult = await MlkitOcr.detectFromUri(picture.uri);
			// eslint-disable-next-line no-console
			console.log(JSON.stringify(result));
		}
	}

	return (
		<View style={styles.container}>
			<Camera
				style={{ flex: 1 }}
				type={Camera.Constants.Type.back}
				ref={r => {
					if (r) {
						camera = r;
					}
				}}
			/>
			<Button title="Take a picture" onPress={takePicture} />
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
