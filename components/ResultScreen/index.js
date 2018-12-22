import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const ResultScreen = (props) => {
	const {state} = props.navigation;
	let users = state.params;

	let usersRendered = [];
	users.forEach(function(user) {
		usersRendered.push(<Text>{user['user_name']}</Text>);
	});

	return(
		<View>{usersRendered}</View>
	)
}

export default ResultScreen;