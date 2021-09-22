import React from "react";
import {View, Text} from "react-native";

const TranscriptionView = (transcribedText:string): JSX.Element => {
	return (
		<View>
			<Text>{transcribedText}</Text>
		</View>
	);
};

export default TranscriptionView;
