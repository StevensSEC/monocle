import React from "react";
import { View, Text} from "react-native";

const TranscriptionView = (prop:string): JSX.Element => {
	return (
		<View>
			<Text>{prop}</Text>
		</View>
	);
};

export default TranscriptionView;
