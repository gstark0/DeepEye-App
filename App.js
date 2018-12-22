import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import CameraScreen from './components/CameraScreen';
import ResultScreen from './components/ResultScreen';


const AppStackNavigator = createStackNavigator({
	CameraScreen: {
		screen: CameraScreen
	},
	ResultScreen: {
		screen: ResultScreen
	}
})

const App = createAppContainer(AppStackNavigator);
export default App;