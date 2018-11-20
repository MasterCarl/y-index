import React from  'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import {
  SCREENS
} from '../App.js';

export class SubmitIssue extends React.Component {  
  render() {
    return (
      <View style={{ backgroundColor: '#333', flex: 1 }}>
        <Text style={{ color: '#fff'}}>Hello, world!</Text>
        <Button title="Go to Map Overview" onPress={() => this.props.goToScreen(SCREENS.MapOverview)} />
      </View>
    );
  }
}