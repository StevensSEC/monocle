import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Camera } from "expo-camera";
import "@tensorflow/tfjs-react-native";

import PhotoButton from "../components/PhotoButton";
export interface CameraViewProps {
	processImage: (uri: string) => Promise<void>;
}

const CameraView = ({ processImage }: CameraViewProps): JSX.Element => {
	const [ref, setRef] = useState<Camera | null>();
	const [lastImageURI, setLastImageURI] = useState<string>();

	const onPressPhotoButton = async (): Promise<void> => {
		const picture = await ref?.takePictureAsync();
		if (!picture?.uri) {
			throw new Error("No picture");
		}
		setLastImageURI(picture?.uri);
		await processImage(picture?.uri);
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
