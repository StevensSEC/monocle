import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
interface PhotoButtonProps {
	onPress: VoidFunction;
}

const PhotoButton = (props: PhotoButtonProps): JSX.Element => {
	return (
		<Pressable onPress={props.onPress} style={styles.button} accessibilityLabel="Take photo">
			<Text>Take Photo</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		borderColor: "#000000",
		borderWidth: 2,
		borderRadius: 10,
		margin: 20,
		padding: 20,
		textAlign: "center",
	},
});

export default PhotoButton;
