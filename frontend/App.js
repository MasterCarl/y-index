/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';
import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';
import { SubmitIssue } from './js/SubmitIssue.js';
import { MapOverview } from './js/MapOverview.js';
import {
  apiKey
} from './key.js';

var sharedProps = {
  apiKey
}

console.ignoredYellowBox = ['Warning: componentWill'];
export const SCREENS = {
  SubmitIssue: 'SubmitIssue',
  IssueDialog: 'IssueDialog',
  MapOverview: 'MapOverview',
  ArMap: 'ArMap'
}

// Sets the default scene you want for AR and VR
const InitialARScene = require('./js/HelloWorldSceneAR');

export default class ArBerlin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sharedProps : sharedProps,
      currentScreen: SCREENS.MapOverview,
    }
    this._getARNavigator = this._getARNavigator.bind(this);
    this.goToScreen = this.goToScreen.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    const { currentScreen } = this.state;
    if (currentScreen == SCREENS.SubmitIssue) {
      return <SubmitIssue goToScreen={this.goToScreen} />;
    } else if (currentScreen) {
      return <MapOverview goToScreen={this.goToScreen} />;
    } else if (currentScreen == SCREENS.ArMap) {
      return this._getARNavigator();
    } else {
      return <View><Text>Error no screen selected. Current screen: {this.state.currentScreen}</Text></View>
    }
  }

  goToScreen(screen) {
    this.setState({ currentScreen: screen });
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene}} />
    );
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

module.exports = ArBerlin
