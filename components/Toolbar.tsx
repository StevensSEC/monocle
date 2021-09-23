import React from "react";
import { StyleSheet, Pressable, Image } from "react-native";

const styles = StyleSheet.create({
    container:{
        backgroundColor: `black`,
    },
	captureBtn: {
        width: 80,
        height: 80,
        borderColor:'#4f83cc',
        borderRadius:100,
        borderWidth: 6,
        opacity:0.8,
        alignSelf: 'center',
        marginBottom: 30
    },
});

export default ({
})=> (
        <Pressable style={[styles.captureBtn]} 
            onPress= {()=>alert ('button pressed!')}>    
                <Image
                    source={require('..assets/logo-replace-this.png')}
                    style={{ width:80, height:80, backgroundColor:'red', borderRadius:100 }}>
                </Image>
        </Pressable>
)
