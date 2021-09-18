import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Camera } from "expo-camera";

import PhotoButton from "./PhotoButton/PhotoButton";
import createOnPressPhotoButton from "./PhotoButton/onPressPhotoButton";

const CameraView = (): JSX.Element => {
	const [ref, setRef] = useState<Camera | null>();
	const [lastImageURI, setLastImageURI] = useState<string>();

	const onPressPhotoButton = createOnPressPhotoButton(ref, setLastImageURI)

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
