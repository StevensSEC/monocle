import React from 'react'
import  { Button } from 'react-native'
import onPressPhotoButton from './onPressPhotoButton'

interface PhotoButtonProps {
    color: string,
}

const PhotoButton = (props: PhotoButtonProps) : JSX.Element => {
    return (
        <Button
            onPress={onPressPhotoButton}
            title=""
            color={props.color}
            accessibilityLabel="Button to take photo"/>
    )
}