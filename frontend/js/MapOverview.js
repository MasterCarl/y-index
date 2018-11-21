import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import { 
  ActionButton,
  BottomNavigation,
  Divider,
} from 'react-native-material-ui';
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

const mockedSchuleMarkers = [ {
  coordinate: {
    latitude:53.6859, 
    longitude:9.98041,
  },
  name: 'Grundschule Falkenberg',
  address: 'MoorbekStrasse 15, 22846, Nordersted'
}];

export class MapOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      schuleMarkers: [],
      familyMarkers: [],
      kindergartenMarkers: [],
      collapsed: true,
      currentMarker: null,
    };
  }
  getMarkers(markers) {
    return markers.map(marker => (
      <MapView.Marker
        key={marker.name}
        coordinate={marker.coordinate}
        title={marker.name}
        onPress={() => this.expandMarkerInfo(marker)}
       />
    ));    
  }

  changeCategory(category) {
    const nextState = {};
    if (this.state.active === category) {
      nextState.active = null;
    } else {
      nextState.active = category;
    }
    nextState.schuleMarkers = [];
    nextState.familyMarkers = [];
    nextState.kindergartenMarkers = [];
    if (nextState.active === 'schule') {
      nextState.schuleMarkers = mockedSchuleMarkers;
    }
    this.setState(nextState);
  }

  expandMarkerInfo(marker) {
    this.setState({ collapsed: false, currentMarker: marker })
  }

  collapseMarkerInfo() {
    if (this.state.collapsed === false) {
      this.setState({collapsed: true});
    }
  }
 
  render() {
    const { height } = Dimensions.get('window');
    const { active, schuleMarkers, familyMarkers, kindergartenMarkers, collapsed, currentMarker  } = this.state;
    const actionButtonHeight = collapsed ? height - 90 : height - 290
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={region}
                onPress={() => this.collapseMarkerInfo()}
                onPanDrag={() => this.collapseMarkerInfo()}
              >
              {schuleMarkers.length > 0 && this.getMarkers(schuleMarkers)}
              {familyMarkers.length > 0 && this.getMarkers(familyMarkers)}
              {kindergartenMarkers.length > 0 && this.getMarkers(kindergartenMarkers)}
            </MapView>
            <MapView.Callout style={{ position: 'absolute', top: 0, right: 0}}>
                  <View style={styles.calloutView}>
                      <TextInput style={styles.calloutSearch}
                          placeholder={'Search'}
                      />
                  </View>
            </MapView.Callout>
        </View>
        <View style={{ position: 'relative', height: actionButtonHeight }}>
          <ActionButton onPress={() => this.props.goToScreen(SCREENS.SubmitIssue)} />    
        </View>
        <View style={{ position: 'relative', marginTop: 15, backgroundColor: 'white'}}>       
          <View>
            {collapsed === true && (<BottomNavigation active={this.state.active} hidden={false}
              style={{ shadowOffset: {
                "height": 0,
                "width": 0,
              },
              shadowOpacity: 0, shadowColor: '#fff'}}
              >
                <BottomNavigation.Action
                    key="schule"
                    icon="today"
                    label="Schule"
                    onPress={() => this.changeCategory('schule')}
                />
                <BottomNavigation.Action
                    key="family"
                    icon="people"
                    label="Familien"
                    onPress={() => this.changeCategory(active: 'family')}
                />
                <BottomNavigation.Action
                    key="kindergarten"
                    icon="bookmark-border"
                    label="Kindergarten"
                    onPress={() => this.changeCategory('kindergarten')}
                />
            </BottomNavigation>)}

            <View style={{ zIndex: 100, height: 250, borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingLeft: 20, paddingTop: 5 }}>
              <TouchableOpacity onPress onPress={() => this.collapseMarkerInfo()} >
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDD', width: 75, marginBottom: 3, marginLeft: 140,  }} />
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDD', width: 75, marginLeft: 140, marginBottom: 10 }} />
              </TouchableOpacity>
              {currentMarker !== null && (
                <Text>{currentMarker.address}</Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );

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
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})