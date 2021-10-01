import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Camera } from "expo-camera";
import PhotoButton from "../components/PhotoButton";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackProps } from "../App";

type CameraProps = StackScreenProps<RootStackProps, "Camera">;

const CameraView = ({ route, navigation }: CameraProps): JSX.Element => {
	const [ref, setRef] = useState<Camera | null>();

	const onPressPhotoButton = async (): Promise<void> => {
		const picture = await ref?.takePictureAsync();
		if (!picture?.uri) {
			throw new Error("No picture");
		}

		navigation.navigate("Transcription", {
			latestImagePath: picture.uri,
			objectModel: route.params.objectModel,
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
				style={{ flex: 1 }}
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

export default CameraView;
