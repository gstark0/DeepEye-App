import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';

const ResultScreen = (props) => {
	const {state} = props.navigation;
	let users = state.params;

	let usersRendered = [];
	users.forEach(function(user) {
		usersRendered.push(
			<TouchableOpacity style={styles.userData}>
				<Text style={styles.userName}>{user['user_name']}</Text>
				<Text>{user['user_fb']}</Text>
			</TouchableOpacity>
		);
	});

	return(
		<View>{usersRendered}</View>
	)
}

const styles = StyleSheet.create({
	userData: {
		padding: 10,
		borderBottomWidth: 2,
		borderBottomColor: '#e2e2e2'
	},
	userName: {
		fontWeight: 'bold'
	}
});

export default ResultScreen;