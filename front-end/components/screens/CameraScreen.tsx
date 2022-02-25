import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Camera } from "expo-camera";
import PhotoButton from "../PhotoButton";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackProps } from "../../App";

type CameraProps = StackScreenProps<RootStackProps, "Camera">;

const CameraScreen = ({ navigation }: CameraProps): JSX.Element => {
	const [ref, setRef] = useState<Camera | null>();
	const [ratio, setRatio] = useState<"4:3" | "16:9">("16:9");

	const onPressPhotoButton = async (): Promise<void> => {
		const picture = await ref?.takePictureAsync();
		if (!picture?.uri) {
			throw new Error("No picture");
		}

		navigation.navigate("Processing", {
			latestImagePath: picture.uri,
		});
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
				style={{
					// flex: 1,
					minHeight: "100%",
					width: "100%",
					aspectRatio: 9 / 16,
				}}
				ratio={ratio}
				type={Camera.Constants.Type.back}
			/>
			<PhotoButton onPress={onPressPhotoButton} />
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

export default CameraScreen;
