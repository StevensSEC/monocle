import { RotateWithOffset } from "@tensorflow/tfjs-core";
import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import * as Clipboard from "expo-clipboard";

interface ResultContainerProps {
	defaultText: string;
}

const ResultContainer = ({ defaultText }: ResultContainerProps): JSX.Element => {
	const [result, changeResult] = useState<string>(defaultText);
	const [copyButtonStyle, changeCopyButtonStyle] = useState<Object>(styles.copyButton);
	const [resetButtonStyle, changeResetButtonStyle] = useState<Object>(styles.resetButton);

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
				<Pressable
					onPressIn={() => {
						changeCopyButtonStyle(styles.copyButtonPressed);
					}}
					onPressOut={() => {
						changeCopyButtonStyle(styles.copyButton);
					}}
					onPress={() => {
						copyResultToClipboard(result);
					}}
					style={[styles.button, copyButtonStyle]}
					accessibilityRole="button"
					accessibilityLabel={"Copy text in box to your device's clipboard"}
				>
					<Text style={styles.buttonText}>Copy Text To Clipboard</Text>
				</Pressable>
				<Pressable
					onPressIn={() => {
						changeResetButtonStyle(styles.resetButtonPressed);
					}}
					onPressOut={() => {
						changeResetButtonStyle(styles.resetButton);
					}}
					onPress={() => {
						changeResult(defaultText);
					}}
					style={[styles.button, resetButtonStyle]}
					accessibilityRole="button"
					accessibilityLabel={"Reset text in box back to detected results"}
				>
					<Text style={styles.buttonText}>Reset Text</Text>
				</Pressable>
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
		justifyContent: "space-between",
	},

	button: {
		borderWidth: 2,
		borderRadius: 20,
		paddingVertical: 20,
		paddingHorizontal: 10,
		marginVertical: 20,
		marginHorizontal: 5,
	},

	copyButton: {
		backgroundColor: "#777711",
		borderColor: "#000000",
		flex: 60,
	},

	copyButtonPressed: {
		backgroundColor: "#666600",
		borderColor: "#000000",
		flex: 60,
	},

	resetButton: {
		backgroundColor: "#bb2222",
		borderColor: "#000000",
		flex: 40,
	},

	resetButtonPressed: {
		backgroundColor: "#aa1111",
		borderColor: "#000000",
		flex: 40,
	},

	buttonText: {
		color: "#ffffff",
		textAlign: "center",
		textAlignVertical: "center",
	},
});

export default ResultContainer;
