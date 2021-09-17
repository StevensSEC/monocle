import { Camera, CameraCapturedPicture } from 'expo-camera'

const onPressPhotoButton = (ref : Camera | null) : void => {
    void (async (): Promise<CameraCapturedPicture | undefined> => {
        const picture = await ref?.takePictureAsync();
        return picture;
    })();
}

export default onPressPhotoButton