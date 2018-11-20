import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { COLORS } from './Styles';
import { SCREENS } from '../App';

export class MapOverview extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView><Text>Here will be google maps</Text></ScrollView>
        <TouchableOpacity
          style={{ position: 'relative', marginTop: -20, right: 0}}
          onPress={() => this.props.goToScreen(SCREENS.SubmitIssue)}>
          <Text>+</Text>
        </TouchableOpacity>
        <View style={{ height: 50, backgroundColor: COLORS.Background }}>
          <Text style={{ color: '#fff'}}>Y-indexxxxxxx</Text>
        </View>
      </View>
    )

  }
}