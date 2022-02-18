import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "./components/screens/CameraScreen";
import TranscriptionScreen from "./components/screens/TranscriptionScreen";
import "@tensorflow/tfjs-react-native";
import { Text, StyleSheet, View } from "react-native";
import ProcessingScreen from "./components/screens/ProcessingScreen";

export type RootStackProps = {
	Camera: {
		filePath: string | undefined;
	};
	Transcription: {
		results: string;
	};
	Processing: {
		latestImagePath: string;
	};
};

const RootStack = createStackNavigator<RootStackProps>();

const App = (): JSX.Element => {
	return (
		<NavigationContainer>
			<RootStack.Navigator initialRouteName="Camera">
				<RootStack.Group screenOptions={{ headerShown: false }}>
					<RootStack.Screen name="Camera" component={CameraScreen} />
				</RootStack.Group>
				<RootStack.Group screenOptions={{ presentation: "modal", headerShown: false }}>
					<RootStack.Screen name="Processing" component={ProcessingScreen} />
					<RootStack.Screen name="Transcription" component={TranscriptionScreen} />
				</RootStack.Group>
			</RootStack.Navigator>
		</NavigationContainer>
	);
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
