import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Camera, CameraCapturedPicture } from "expo-camera";

import PhotoButton from "../components/PhotoButton/PhotoButton"

const CameraView = (): JSX.Element => {
	const [ref, setRef] = useState<Camera | null>()

	const onPressPhotoButton = () : void => {
		void (async (): Promise<CameraCapturedPicture | undefined> => {
			const picture = await ref?.takePictureAsync();
			return picture;
		})();
	}

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
				ref={ref => {setRef(ref)}}
				style={{ flex: 1 }} 
				type={Camera.Constants.Type.back} />
			
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
