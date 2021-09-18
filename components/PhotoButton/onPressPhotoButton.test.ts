import { Camera } from "expo-camera"
import createOnPressPhotoButton from "./onPressPhotoButton"

jest.mock('expo-camera')

test("on press sets the state to the last image taken's URI", () => {
    const ref = new Camera({})
    const setLastImageURI = jest.fn()
    const onPress = createOnPressPhotoButton(ref, setLastImageURI)

    onPress()

    expect(setLastImageURI).toHaveBeenCalled()
    expect(setLastImageURI).toHaveBeenCalledWith<string[]>()
})