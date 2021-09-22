import React from "react";
import { View, Text } from "react-native";

interface TranscriptionViewProps {
	transcribedText: string;
}

const TranscriptionView = (props:TranscriptionViewProps): JSX.Element => {
	return (
		<View>
			<Text>{props.transcribedText}</Text>
		</View>
	);
};

export default TranscriptionView;
