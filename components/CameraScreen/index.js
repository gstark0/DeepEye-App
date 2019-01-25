import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class App extends React.Component {
	state = {
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
	};

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	}

	takePhoto = async () => {
		const { navigate } = this.props.navigation;
		if (this.camera) {
			let photo = await this.camera.takePictureAsync({skipProcessing: true, autoFocus: false, base64: true});
			fetch('http://10.255.15.148:5000/recognize', {
				method: 'POST',
				body: JSON.stringify({
					image: photo.base64
				})
			})
			.then(resp => resp.json())
			.then(resp => {
				console.warn('WORKS');
				console.warn(resp);
				navigate('ResultScreen', resp);
			})
		}
	}

	render() {
		const { hasCameraPermission } = this.state;
		if(hasCameraPermission == null) {
			return <View />;
		} else if (hasCameraPermission == false) {
			return (
				<View>
					<Text>No access to camera!</Text>
				</View>
			);
		} else {
			return (
				<Camera ref={ref => { this.camera = ref; }} style={styles.camera}>
					<TouchableHighlight title='Take' style={styles.takePhotoButton} onPress={this.takePhoto}>
						<Text></Text>
					</TouchableHighlight>
				</Camera>
			);
		}
	}
}

const {height, width} = Dimensions.get('window');
const newWidth = height*(3/4);
const widthOffset = -((newWidth-width)/2);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},

	camera: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		zIndex: 2,
		left: widthOffset,
		right: widthOffset,
	},

	takePhotoButton: {
		position: 'absolute',
		backgroundColor: '#1e88e5',
		width: 80,
		height: 80,
		bottom: '5%',
		margin: 'auto',
		alignSelf: 'center',
		borderRadius: 100,
		borderWidth: 3,
		borderColor: '#004ba0'
	}
});
