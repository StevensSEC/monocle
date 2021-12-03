import React from "react";
import { Text, StyleSheet, Pressable, Image, View } from "react-native";
interface PhotoButtonProps {
	onPress: VoidFunction;
}

const PhotoButton = (props: PhotoButtonProps): JSX.Element => {
	return (
		<View style={styles.container}>
			<Pressable
				onPress={props.onPress}
				style={styles.button}
				accessibilityLabel="Take photo"
			>
				<Image source={require("../assets/Monocle-Logo-Gray.png")} style={styles.img} />
			</Pressable>
			{/* <Text>Take Photo</Text> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "25%",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		backgroundColor: "transparent",
		borderColor: "transparent",
		padding: 20,
		bottom: 0,
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		borderColor: "black",
		backgroundColor: "rgba(77, 84, 89, 0.5)",
		opacity: 0.75,
		borderWidth: 3,
		borderRadius: 100,
		padding: 15,
		textAlign: "center",
		shadowColor: "#303838",
		shadowOffset: { width: 0, height: 5 },
		shadowRadius: 10,
		shadowOpacity: 0.5,
	},
	img: {
		height: 70,
		width: 70,
		backgroundColor: "transparent",
		padding: 2,
		resizeMode: "contain",
		opacity: 0.75,
	},
});

export default PhotoButton;
