import { StackScreenProps } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { RootStackProps } from "../../App";
import axios from "axios";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const SERVER_URL = "https://sec-monocle.herokuapp.com";

type ProcessingProps = StackScreenProps<RootStackProps, "Processing">;

const ProcessingScreen = ({ navigation, route }: ProcessingProps): JSX.Element => {
	const [status, setStatus] = useState<string>("Waiting for image");
	const [showFilePath, setShowFilePath] = useState<boolean>(false);

	useEffect(() => {
		const handleImage = async () => {
			setStatus("Processing...");
			let imgPath = route.params.latestImagePath;
			console.log("image path: " + imgPath);
			const result = await manipulateAsync(imgPath, [{ resize: { height: 1080 } }], {
				compress: 0.8,
				format: SaveFormat.JPEG,
			});
			imgPath = result.uri;
			console.log("compressed image path: " + imgPath);

			const formData = new FormData();
			formData.append("image", {
				//@ts-expect-error This is actually valid usage, but its not in the type declaration.
				uri: imgPath,
				name: "image.png",
				type: "image/png",
			});

			setStatus("Sending to server...");
			try {
				const { data } = await axios.post<JSON>(`${SERVER_URL}/api/upload`, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				setStatus("Done");
				navigation.navigate("Transcription", {
					results: `Objects: ${JSON.stringify(data)}`,
				});
			} catch (e) {
				setStatus("Failed to upload image.");
				// eslint-disable-next-line
				console.log(e);
			}
		};

		handleImage().catch(err => {
			throw err;
		});
	}, []);
	return (
		<View style={styles.container}>
			<Pressable
				onPress={() => {
					setShowFilePath(!showFilePath);
				}}
			>
				<Text style={styles.filePath}>
					File Path: {showFilePath ? route.params.latestImagePath : "<Tap to reveal>"}
				</Text>
			</Pressable>
			<Text>Status: {status}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	filePath: {
		fontWeight: "bold",
	},
});

export default ProcessingScreen;
