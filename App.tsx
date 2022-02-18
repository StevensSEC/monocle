import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "./components/screens/CameraScreen";
import TranscriptionScreen from "./components/screens/TranscriptionScreen";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { Text, StyleSheet, View } from "react-native";
import ProcessingScreen from "./components/screens/ProcessingScreen";

export type RootStackProps = {
	Camera: {
		filePath: string | undefined;
		objectModel: cocoSsd.ObjectDetection;
	};
	Transcription: {
		results: string;
	};
	Processing: {
		latestImagePath: string;
		objectModel: cocoSsd.ObjectDetection;
	};
};

const RootStack = createStackNavigator<RootStackProps>();

const App = (): JSX.Element => {
	const [objDetectModel, setObjDetectModel] = useState<cocoSsd.ObjectDetection>();
	const [canUseCamera, setCanUseCamera] = useState<boolean>(false);
	const [status, setStatus] = useState<string>("Loading tensorflow...");

	useEffect(() => {
		const load = async () => {
			await tf.ready();

			setStatus("Loading object detection model...(app will be locked until loaded)");

			if (!objDetectModel) {
				const objectDetection = await cocoSsd.load();
				setObjDetectModel(objectDetection);
				setCanUseCamera(true);
			}
		};

		load().catch(err => {
			throw err;
		});
	}, []);

	if (!canUseCamera) {
		return (
			<View style={styles.container}>
				<Text>{status}</Text>
			</View>
		);
	} else {
		return (
			<NavigationContainer>
				<RootStack.Navigator initialRouteName="Camera">
					<RootStack.Group screenOptions={{ headerShown: false }}>
						<RootStack.Screen
							name="Camera"
							component={CameraScreen}
							initialParams={{ objectModel: objDetectModel }}
						/>
					</RootStack.Group>
					<RootStack.Group screenOptions={{ presentation: "modal", headerShown: false }}>
						<RootStack.Screen name="Processing" component={ProcessingScreen} />
						<RootStack.Screen name="Transcription" component={TranscriptionScreen} />
					</RootStack.Group>
				</RootStack.Navigator>
			</NavigationContainer>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		paddingTop: 30,
	},
	filePath: {
		fontWeight: "bold",
	},
});

export default App;
