import { StackScreenProps } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	Pressable,
	ActivityIndicator,
	Image,
	ImageBackground,
} from "react-native";
import { RootStackProps } from "../../App";
import axios from "axios";

const SERVER_URL = "https://sec-monocle.herokuapp.com";

type ProcessingProps = StackScreenProps<RootStackProps, "Processing">;

const ProcessingScreen = ({ navigation, route }: ProcessingProps): JSX.Element => {
	const [status, setStatus] = useState<string>("Waiting for image");
	const [showFilePath, setShowFilePath] = useState<boolean>(false);

	useEffect(() => {
		const handleImage = async () => {
			setStatus("Reading...");
			const formData = new FormData();
			formData.append("image", {
				//@ts-expect-error This is actually valid usage, but its not in the type declaration.
				uri: route.params.latestImagePath,
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
			<ImageBackground source={{ uri: route.params.latestImagePath }} style={styles.image}>
				<Pressable
					onPress={() => {
						setShowFilePath(!showFilePath);
					}}
				>
					<Text style={[styles.text, styles.filePath]}>
						File Path: {showFilePath ? route.params.latestImagePath : "<Tap to reveal>"}
					</Text>
				</Pressable>
				<ActivityIndicator style={styles.activityIndicator} size="large" color="#000000" />
				<Text style={styles.text}>Status: {status}</Text>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		display: "flex",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		padding: 10,
		margin: 10,
		borderRadius: 10,
		borderWidth: 3,
		backgroundColor: "white",
	},
	activityIndicator: {
		padding: 5,
		margin: 10,
		borderRadius: 50,
		borderWidth: 3,
		backgroundColor: "white",
	},
	filePath: {
		fontWeight: "bold",
	},
	image: {
		width: "105%",
		height: "105%",
		display: "flex",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default ProcessingScreen;
