import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { RootStackProps } from "../App";

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
