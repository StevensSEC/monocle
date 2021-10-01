import { StackScreenProps } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import { RootStackProps } from "../App";
import { base64ImageToTensor } from "../util/image";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as FileSystem from "expo-file-system";

type TranscriptionProps = StackScreenProps<RootStackProps, "Transcription">;

const TranscriptionScreen = ({ navigation, route }: TranscriptionProps): JSX.Element => {
	const [objectDetectionPreidictions, setObjectDetectionPreidictions] =
		useState<cocoSsd.DetectedObject[]>();
	const [status, setStatus] = useState<string>("Waiting for image");
	const [showFilePath, setShowFilePath] = useState<boolean>(false);

	useEffect(() => {
		const handleImage = async () => {
			setStatus("Reading...");
			const buffer = await FileSystem.readAsStringAsync(route.params.latestImagePath, {
				encoding: FileSystem.EncodingType.Base64,
			});
			setStatus("Processing...");
			const imageTensor: tf.Tensor3D = base64ImageToTensor(buffer);

			setStatus("Detecting objects...");
			const predictions = await route.params.objectModel?.detect(imageTensor);
			setObjectDetectionPreidictions(predictions);
			setStatus(`Objects: ${JSON.stringify(objectDetectionPreidictions)}`);
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
			<Button
				onPress={() => {
					navigation.goBack();
				}}
				title="Go Back"
			/>
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

export default TranscriptionScreen;
