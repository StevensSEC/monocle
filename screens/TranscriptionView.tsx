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

const TranscriptionView = ({ navigation, route }: TranscriptionProps): JSX.Element => {
	
	return (
		<View style={styles.container}>
			<Text>Status: {route.params.results}</Text>
			<Button
				onPress={() => {
					navigation.pop(2);
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

export default TranscriptionView;
