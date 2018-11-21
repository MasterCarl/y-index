import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
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
import * as api from "./api";

const region = {
  latitude:53.6859, 
  longitude:9.98041, 
  latitudeDelta:0.1,
  longitudeDelta:0.1
}


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
    this.getMarkers = this.getMarkers.bind(this);
  }

  componentDidMount() {
    const parent = this;
      Icon.getImageSource("today", 20).then(imageSource => parent.schuleIcon);
      Icon.getImageSource("people", 20).then(imageSource => parent.familyIcon);
      Icon.getImageSource("bookmark-border", 20).then(imageSource => parent.kitaIcon);
      Icon.getImageSource("stars", 20).then(imageSource => parent.starsIcon);
      this.fetchVenues().catch(console.error);
  }

  getMarkers(markers, category) {
    return markers.map(marker => {
      let image = this.schuleIcon;
      if (marker.saved === true) {
        image = this.starsIcon;
      } else if (category === 'family') {
        image = this.familyIcon
      } else if (category === 'kindergarten') {
        image = this.kitaIcon
      }
      return (
        <MapView.Marker
          key={marker.id}
          coordinate={marker.location}
          title={marker.name}
          image={image}
          onPress={() => this.expandMarkerInfo(marker)}
        />
      );
    });    
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
      nextState.schuleMarkers = this.state.venues.school;
    }
    if (nextState.active === 'family') {
        nextState.familyMarkers = this.state.venues.playground;
    }
    if (nextState.active === 'kindergarten') {
        nextState.kindergartenMarkers = this.state.venues.kita;
    }

    this.setState(nextState);
  }

  expandMarkerInfo(marker) {
    this.setState({ collapsed: false, currentMarker: marker });
  }

  collapseMarkerInfo() {
    if (this.state.collapsed === false) {
      this.setState({collapsed: true});
    }
  }

  onSaveMarker() {
    const { currentMarker, venues, familyMarkers, kindergartenMarkers, schuleMarkers } = this.state;
    currentMarker.saved = true;
    let foundMarker = false;
    familyMarkers.forEach(marker => {
      if (marker.name == currentMarker.name) {
        marker.saved = true;
        foundMarker = true;
        familyMarkers.forEach(marker2 => {
          if (marker2.name == currentMarker.name) {
            marker2.saved = true;
          }
        });
      }
    });
    if (foundMarker) return;
    kindergartenMarkers.forEach(marker => {
      if (marker.name == currentMarker.name) {
        marker.saved = true;
        foundMarker = true;
        familyMarkers.forEach(marker2 => {
          if (marker2.name == currentMarker.name) {
            marker2.saved = true;
          }
        });
      }
    });
    if (foundMarker) return;
    schuleMarkers.forEach(marker => {
      if (marker.name == currentMarker.name) {
        marker.saved = true;
        foundMarker = true;
        familyMarkers.forEach(marker2 => {
          if (marker2.name == currentMarker.name) {
            marker2.saved = true;
          }
        });
      }
    });
  }

  async fetchVenues() {
      const venues = await api.getVenuesByCategory();
      this.setState({
          venues,
          schuleMarkers: [],
          familyMarkers: [],
		      kindergartenMarkers: [],
      });
  }

  changeDetails() {
    console.log('follow-on project :)');
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
              {schuleMarkers.length > 0 && this.getMarkers(schuleMarkers, 'schule')}
              {familyMarkers.length > 0 && this.getMarkers(familyMarkers, 'family')}
              {kindergartenMarkers.length > 0 && this.getMarkers(kindergartenMarkers, 'kindergarten')}
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
                    label="Kita"
                    onPress={() => this.changeCategory('kindergarten')}
                />
            </BottomNavigation>)}

            <View style={{ zIndex: 100, height: 250, borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingLeft: 20, paddingTop: 5 }}>
              <TouchableOpacity onPress onPress={() => this.collapseMarkerInfo()} >
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDD', width: 75, marginBottom: 3, marginLeft: 140,  }} />
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDD', width: 75, marginLeft: 140, marginBottom: 10 }} />
              </TouchableOpacity>
              {currentMarker !== null && (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ width: 300 }}>
                    <Text>{currentMarker.name}</Text>
                    <Text>{currentMarker.address}, {currentMarker.city}</Text>
                  </View>
                  <View style={{ width: 100 }}>
                    <TouchableOpacity onPress={() => this.onSaveMarker()}>
                      <Icon name="stars" size={30}/>
                    </TouchableOpacity>
                  </View>                  
                </View>
              )}
              <View style={{ position: 'relative', marginTop: 0, backgroundColor: 'white'}}>
                <Image 
                  style={{ height:55}}
                  source = {require('./assets/questions.png')}
                        key="question"
                        resizeMode="contain"
                        onPress={() => this.changeDetails('question')}
                  />
                <Image source ={require('./assets/ideen.png')}
                        key="ideen"
                        style={{ height: 55}}
                        resizeMode="contain"
                        onPress={()=>this.changeDetails('ideen')}
                
                />
                <Image source = {require('./assets/challenges.png')}
                        key='challenge'
                        style={{ height: 55}}
                        resizeMode="contain"
                        onPress={()=>this.changeDetails('challenge')}
                
                />
              </View>
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