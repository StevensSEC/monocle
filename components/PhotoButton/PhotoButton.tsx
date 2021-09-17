import React from "react";
import { Button } from "react-native";
interface PhotoButtonProps {
	onPress: VoidFunction;
	color: string;
}

const PhotoButton = (props: PhotoButtonProps): JSX.Element => {
	return (
		<Button
			onPress={props.onPress}
			title=""
			color={props.color}
			accessibilityLabel="Button to take photo"
		/>
	);
};

export default PhotoButton;
