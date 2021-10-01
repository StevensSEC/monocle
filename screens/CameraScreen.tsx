import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RootStackProps } from "../App";
import CameraView from "../components/CameraView";

type CameraProps = StackScreenProps<RootStackProps, "Camera">;

const CameraScreen = ({ navigation, route }: CameraProps): JSX.Element => {
	return (
		<View style={styles.container}>
			<CameraView navigation={navigation} route={route} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default CameraScreen;
