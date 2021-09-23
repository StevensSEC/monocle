import React, { useEffect } from "react";
import { StyleSheet, View, Image} from "react-native";
import { Camera } from "expo-camera";
import Toolbar from "./Toolbar"
import { registerBackend } from "@tensorflow/tfjs-core";

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

	return (
		<View style={styles.container}>
			<Camera style={{ flex: 1}} type={Camera.Constants.Type.back}>
				<Toolbar/>	
			</Camera>
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
