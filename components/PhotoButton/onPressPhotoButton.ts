import React from "react";
import { Camera } from "expo-camera";

const createOnPressPhotoButton = (
	ref: Camera | null | undefined,
	setLastImageURI: React.Dispatch<React.SetStateAction<string | undefined>>
): VoidFunction => {
	return async (): Promise<void> => {
		const picture = await ref?.takePictureAsync();
		setLastImageURI(picture?.uri);
	};
};

export default createOnPressPhotoButton;
