import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CameraView from "./components/CameraView";
import TranscriptionView from "./components/TranscriptionView";
import { StyleSheet } from "react-native";
import ProcessingView from "./components/ProcessingView";

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
					<RootStack.Screen name="Camera" component={CameraView} />
				</RootStack.Group>
				<RootStack.Group screenOptions={{ presentation: "modal", headerShown: false }}>
					<RootStack.Screen name="Processing" component={ProcessingView} />
					<RootStack.Screen name="Transcription" component={TranscriptionView} />
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
