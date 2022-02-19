import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import * as Clipboard from "expo-clipboard";

interface ResultContainerProps {
	defaultText: string;
}

const ResultContainer = ({ defaultText }: ResultContainerProps): JSX.Element => {
	const [result, changeResult] = useState<string>(defaultText);

	const copyResultToClipboard = (result: string): void => {
		Clipboard.setString(result);
	};

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
				accessibilityRole="text"
				accessibilityLabel={"Transcription Result is... " + result}
			/>
			<View style={styles.horizontalContainer}>
				<Button
					onPress={() => {
						copyResultToClipboard(result);
					}}
					title="Copy to Clipboard"
					color="#777711"
					accessibilityLabel={"Copy text in box to your device's clipboard"}
				/>
				<Button
					onPress={() => {
						changeResult(defaultText);
					}}
					title="Reset Text"
					color="#bb2222"
					accessibilityLabel={"Reset text in box back to detected results"}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	textbox: {
		borderColor: "#000000",
		borderWidth: 2,
		padding: 2,
		margin: 2,
		marginTop: 250,
		textAlign: "center",
		textAlignVertical: "center",
	},

	horizontalContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 20,
	},
});

export default ResultContainer;
