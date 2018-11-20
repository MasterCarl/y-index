import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';
import MapView from 'react-native-maps'; 
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { COLORS } from './Styles';
import { SCREENS } from '../App';

const region = {
  latitude:53.6859, 
  longitude:9.98041, 
  latitudeDelta:0.1,
  longitudeDelta:0.1
}

const markerCoordinate ={
  latitude:53.6859, 
  longitude:9.98041
}
export class MapOverview extends React.Component {
  render() {
    return (
      <View style={{ position: 'relative'}}>
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={region}
              />
              <MapView.Marker
                  coordinate={
                      markerCoordinate
                  }
                  title={'norderstedt marker '}
                  description={'My marker'}
              />
              <MapView.Callout>
                  <View style={styles.calloutView}>
                      <TextInput style={styles.calloutSearch}
                          placeholder={'Search'}
                      />
                  </View>
              </MapView.Callout>
        </View>
        <View style={{ position: 'absolute', top: 603, left: 0, right: 0}}>
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => this.props.goToScreen(SCREENS.SubmitIssue)}>
            <Text style={{
              fontSize: 30,
              textAlign: 'right',
              marginRight: 20,
              width: 30,
              backgroundColor: COLORS.Blue5,
              borderRadius: 0.5 }}>
              +
            </Text>
          </TouchableOpacity>
          <View style={{ height: 50, backgroundColor: COLORS.Background }}>
            <Text style={{ color: '#fff'}}>Y-indexxxxxxx</Text>
          </View>
        </View>
      </View>
    )
    /*return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={styles.container}>
            <MapView style={styles.map}
              initialRegion={region}
            />
            <MapView.Marker
                coordinate={
                    markerCoordinate
                }
                title={'norderstedt marker '}
                description={'My marker'}
            />
            <MapView.Callout>
                <View style={styles.calloutView}>
                    <TextInput style={styles.calloutSearch}
                        placeholder={'Search'}
                    />
                </View>
            </MapView.Callout>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{ width: '100%', backgroundColor: COLORS.Blue5, borderRadius: 0.5 }}
          onPress={() => this.props.goToScreen(SCREENS.SubmitIssue)}>
          <Text style={{ fontSize: 30, textAlign: 'right', marginRight: 20}}>+</Text>
        </TouchableOpacity>
        <View style={{ height: 50, backgroundColor: COLORS.Background }}>
          <Text style={{ color: '#fff'}}>Y-indexxxxxxx</Text>
        </View>
      </View>
    )*/

  }
}


const styles = StyleSheet.create({
  /*container: {
      position: 'relative', 
      width: '100%',
      height: 800,
      justifyContent: 'flex-end',
      alignItems:'center'
  }, */

  calloutView: {
      flexDirection: "row",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: 10,
      width: "40%",
      marginLeft: "30%",
      marginRight: "30%",
      marginTop: 20
  },
  calloutSearch: {
      borderColor: "transparent",
      marginLeft: 10,
      width: "90%",
      marginRight: 10,
      height: 40,
      borderWidth: 0.0  
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 637,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})