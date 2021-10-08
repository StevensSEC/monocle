import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";

interface ResultContainerProps {
	defaultText: string;
}

const ResultContainer = ({ defaultText }: ResultContainerProps): JSX.Element => {
	const [result, changeResult] = useState<string>(defaultText);
	return (
		<SafeAreaView>
			<TextInput
				value={result}
				onChangeText={changeResult}
				style={styles.textbox}
				placeholder={"No text here..."}
				multiline={true}
				numberOfLines={5}
				autoCapitalize="none"
				accessibilityLabel={"Transcription Result is... " + result}
			/>
			<Pressable
				onPress={() => {
					changeResult(defaultText);
				}}
				style={styles.resetButton}
				accessibilityLabel={"Reset text in box back to detected results"}
			>
				<Text style={styles.resetButtonText}>Reset Text</Text>
			</Pressable>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	textbox: {
		borderColor: "#000000",
		borderWidth: 2,
		padding: 2,
		margin: 2,
		marginTop: 20,
		textAlign: "center",
		textAlignVertical: "center",
	},

	resetButton: {
		backgroundColor: "#bb2222",
		borderColor: "#000000",
		borderWidth: 2,
		borderRadius: 20,
		padding: 20,
		marginVertical: 20,
		marginHorizontal: 120,
	},

	resetButtonText: {
		color: "#ffffff",
		textAlign: "center",
		textAlignVertical: "center",
	},
});

export default ResultContainer;
