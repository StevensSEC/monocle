import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { RootStackProps } from "../../App";
import ResultContainer from "../ResultContainer";

type TranscriptionProps = StackScreenProps<RootStackProps, "Transcription">;

const TranscriptionScreen = ({ navigation, route }: TranscriptionProps): JSX.Element => {
	return (
		<View style={styles.container}>
			<ResultContainer defaultText={route.params.results} />
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

export default TranscriptionScreen;
