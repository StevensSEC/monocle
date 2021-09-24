import React from "react";
import { Button } from "react-native";

interface FlashButtonProps {
    onPress: VoidFunction;
    color: string;
}

const FlashButton = (props: FlashButtonProps): JSX.Element => {
	return (
		<Button
			onPress={props.onPress}
			title=""
			color={props.color}
			accessibilityLabel="Toggle Flash"
		/>
	);
};

export default FlashButton;