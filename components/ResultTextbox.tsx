import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

interface ResultTextboxProps {
	defaultText: string;
}

const ResultTextbox = ({ defaultText }: ResultTextboxProps): JSX.Element => {
	const [result, changeResult] = useState<string>(defaultText);
	return (
		<SafeAreaView>
			<TextInput
				value={result}
				onChangeText={changeResult}
				style={styles.textbox}
				placeholder={"No text here..."}
				multiline={true}
				numberOfLines={3}
				autoCapitalize="none"
				accessibilityLabel={"Transcription Result is... " + result}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	textbox: {
		borderColor: "#000000",
		borderWidth: 2,
		padding: 2,
		margin: 2,
		textAlign: "center",
		textAlignVertical: "center",
	},
});

export default ResultTextbox;
