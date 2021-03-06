'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroAmbientLight,
  ViroSpotLight,
  Viro3DObject
} from 'react-viro';
/*import {
  buildingResources
} from './buildingResources.js'*/

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight
          innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true}
        />
        <Viro3DObject
            source={require('./res/reichstag.vrx')}
            resources={[
              require('./res/next_reichstag.fbm/Luftbi00.jpg'),
              require('./res/next_reichstag.fbm/front_ob.jpg'),
              require('./res/next_reichstag.fbm/tex31504.png'),
              require('./res/next_reichstag.fbm/tex31513.png'),
              require('./res/next_reichstag.fbm/tex31522.png'),
              require('./res/next_reichstag.fbm/tex31531.png'),
              require('./res/next_reichstag.fbm/Luftbild.jpg'),
              require('./res/next_reichstag.fbm/ost_west.jpg'),
              require('./res/next_reichstag.fbm/tex31505.png'),
              require('./res/next_reichstag.fbm/tex31514.png'),
              require('./res/next_reichstag.fbm/tex31523.png'),
              require('./res/next_reichstag.fbm/tex31559.png'),
              require('./res/next_reichstag.fbm/_2.jpg'),
              require('./res/next_reichstag.fbm/seite.jpg'),
              require('./res/next_reichstag.fbm/tex31506.png'),
              require('./res/next_reichstag.fbm/tex31515.png'),
              require('./res/next_reichstag.fbm/tex31524.png'),
              require('./res/next_reichstag.fbm/tex31587.png'),
              require('./res/next_reichstag.fbm/_5.jpg'),
              require('./res/next_reichstag.fbm/seite00.jpg'),
              require('./res/next_reichstag.fbm/tex31507.png'),
              require('./res/next_reichstag.fbm/tex31516.png'),
              require('./res/next_reichstag.fbm/tex31525.png'),
              require('./res/next_reichstag.fbm/textur.jpg'),
              require('./res/next_reichstag.fbm/_8.jpg'),
              require('./res/next_reichstag.fbm/seite01.jpg'),
              require('./res/next_reichstag.fbm/tex31508.png'),
              require('./res/next_reichstag.fbm/tex31517.png'),
              require('./res/next_reichstag.fbm/tex31526.png'),
              require('./res/next_reichstag.fbm/turm_u00.jpg'),
              require('./res/next_reichstag.fbm/back.jpg'),
              require('./res/next_reichstag.fbm/tex31500.png'),
              require('./res/next_reichstag.fbm/tex31509.png'),
              require('./res/next_reichstag.fbm/tex31518.png'),
              require('./res/next_reichstag.fbm/tex31527.png'),
              require('./res/next_reichstag.fbm/turm_unt.jpg'),
              require('./res/next_reichstag.fbm/back_sei.jpg'),
              require('./res/next_reichstag.fbm/tex31501.png'),
              require('./res/next_reichstag.fbm/tex31510.png'),
              require('./res/next_reichstag.fbm/tex31519.png'),
              require('./res/next_reichstag.fbm/tex31528.png'),
              require('./res/next_reichstag.fbm/front.jpg'),
              require('./res/next_reichstag.fbm/tex31502.png'),
              require('./res/next_reichstag.fbm/tex31511.png'),
              require('./res/next_reichstag.fbm/tex31520.png'),
              require('./res/next_reichstag.fbm/tex31529.png'),
              require('./res/next_reichstag.fbm/front_00.jpg'),
              require('./res/next_reichstag.fbm/tex31503.png'),
              require('./res/next_reichstag.fbm/tex31512.png'),
              require('./res/next_reichstag.fbm/tex31521.png'),
              require('./res/next_reichstag.fbm/tex31530.png')
            ]}
            position={[0, .5, -1]}
            scale={[.01, .01, .01]}
            type="VRX" />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldSceneAR;

/*
{
  <Viro3DObject
  source={require('./res/all_buildings.vrx')}
  resources={[require('./res/all_buildings.fbm/Luftbi00.jpg'),
  require('./res/all_buildings.fbm/tex103.jpg'),
  require('./res/all_buildings.fbm/tex120.jpg'),
  require('./res/all_buildings.fbm/tex188.jpg'),
  require('./res/all_buildings.fbm/tex21376.jpg'),
  require('./res/all_buildings.fbm/tex24186.jpg'),
  require('./res/all_buildings.fbm/tex31502.png'),
  require('./res/all_buildings.fbm/tex31521.png'),
  require('./res/all_buildings.fbm/tex38.jpg'),
  require('./res/all_buildings.fbm/tex55.jpg'),
  require('./res/all_buildings.fbm/tex72.jpg'),
  require('./res/all_buildings.fbm/tex86.jpg'),
  require('./res/all_buildings.fbm/Luftbild.jpg'),
  require('./res/all_buildings.fbm/tex104.jpg'),
  require('./res/all_buildings.fbm/tex121.jpg'),
  require('./res/all_buildings.fbm/tex189.jpg'),
  require('./res/all_buildings.fbm/tex22.jpg'),
  require('./res/all_buildings.fbm/tex24187.jpg'),
  require('./res/all_buildings.fbm/tex31503.png'),
  require('./res/all_buildings.fbm/tex31522.png'),
  require('./res/all_buildings.fbm/tex39.jpg'),
  require('./res/all_buildings.fbm/tex56.jpg'),
  require('./res/all_buildings.fbm/tex73.jpg'),
  require('./res/all_buildings.fbm/tex87.jpg'),
  require('./res/all_buildings.fbm/_2.ifl'),
  require('./res/all_buildings.fbm/tex105.jpg'),
  require('./res/all_buildings.fbm/tex122.jpg'),
  require('./res/all_buildings.fbm/tex190.jpg'),
  require('./res/all_buildings.fbm/tex23.jpg'),
  require('./res/all_buildings.fbm/tex24188.jpg'),
  require('./res/all_buildings.fbm/tex31504.png'),
  require('./res/all_buildings.fbm/tex31523.png'),
  require('./res/all_buildings.fbm/tex4.jpg'),
  require('./res/all_buildings.fbm/tex57.jpg'),
  require('./res/all_buildings.fbm/tex74.jpg'),
  require('./res/all_buildings.fbm/tex88.jpg'),
  require('./res/all_buildings.fbm/_2.jpg'),
  require('./res/all_buildings.fbm/tex106.jpg'),
  require('./res/all_buildings.fbm/tex123.jpg'),
  require('./res/all_buildings.fbm/tex191.jpg'),
  require('./res/all_buildings.fbm/tex24.jpg'),
  require('./res/all_buildings.fbm/tex24189.jpg'),
  require('./res/all_buildings.fbm/tex31505.png'),
  require('./res/all_buildings.fbm/tex31524.png'),
  require('./res/all_buildings.fbm/tex40.jpg'),
  require('./res/all_buildings.fbm/tex58.jpg'),
  require('./res/all_buildings.fbm/tex75.jpg'),
  require('./res/all_buildings.fbm/tex89.jpg'),
  require('./res/all_buildings.fbm/back.jpg'),
  require('./res/all_buildings.fbm/tex107.jpg'),
  require('./res/all_buildings.fbm/tex124.jpg'),
  require('./res/all_buildings.fbm/tex192.jpg'),
  require('./res/all_buildings.fbm/tex24171.jpg'),
  require('./res/all_buildings.fbm/tex24190.jpg'),
  require('./res/all_buildings.fbm/tex31506.png'),
  require('./res/all_buildings.fbm/tex31525.png'),
  require('./res/all_buildings.fbm/tex41.jpg'),
  require('./res/all_buildings.fbm/tex59.jpg'),
  require('./res/all_buildings.fbm/tex757.jpg'),
  require('./res/all_buildings.fbm/tex9.jpg'),
  require('./res/all_buildings.fbm/back_sei.jpg'),
  require('./res/all_buildings.fbm/tex108.jpg'),
  require('./res/all_buildings.fbm/tex125.jpg'),
  require('./res/all_buildings.fbm/tex193.jpg'),
  require('./res/all_buildings.fbm/tex24172.jpg'),
  require('./res/all_buildings.fbm/tex24191.jpg'),
  require('./res/all_buildings.fbm/tex31507.png'),
  require('./res/all_buildings.fbm/tex31526.png'),
  require('./res/all_buildings.fbm/tex42.jpg'),
  require('./res/all_buildings.fbm/tex6.jpg'),
  require('./res/all_buildings.fbm/tex758.jpg'),
  require('./res/all_buildings.fbm/tex90.jpg'),
  require('./res/all_buildings.fbm/front.jpg'),
  require('./res/all_buildings.fbm/tex109.jpg'),
  require('./res/all_buildings.fbm/tex126.jpg'),
  require('./res/all_buildings.fbm/tex194.jpg'),
  require('./res/all_buildings.fbm/tex24173.jpg'),
  require('./res/all_buildings.fbm/tex24192.jpg'),
  require('./res/all_buildings.fbm/tex31508.png'),
  require('./res/all_buildings.fbm/tex31527.png'),
  require('./res/all_buildings.fbm/tex43.jpg'),
  require('./res/all_buildings.fbm/tex60.jpg'),
  require('./res/all_buildings.fbm/tex759.jpg'),
  require('./res/all_buildings.fbm/tex91.jpg'),
  require('./res/all_buildings.fbm/front_00.jpg'),
  require('./res/all_buildings.fbm/tex11.jpg'),
  require('./res/all_buildings.fbm/tex127.jpg'),
  require('./res/all_buildings.fbm/tex195.jpg'),
  require('./res/all_buildings.fbm/tex24174.jpg'),
  require('./res/all_buildings.fbm/tex24193.jpg'),
  require('./res/all_buildings.fbm/tex31509.png'),
  require('./res/all_buildings.fbm/tex31528.png'),
  require('./res/all_buildings.fbm/tex44.jpg'),
  require('./res/all_buildings.fbm/tex61.jpg'),
  require('./res/all_buildings.fbm/tex76.jpg'),
  require('./res/all_buildings.fbm/tex92.jpg'),
  require('./res/all_buildings.fbm/front_ob.jpg'),
  require('./res/all_buildings.fbm/tex110.jpg'),
  require('./res/all_buildings.fbm/tex128.jpg'),
  require('./res/all_buildings.fbm/tex196.jpg'),
  require('./res/all_buildings.fbm/tex24175.jpg'),
  require('./res/all_buildings.fbm/tex24194.jpg'),
  require('./res/all_buildings.fbm/tex31510.png'),
  require('./res/all_buildings.fbm/tex31529.png'),
  require('./res/all_buildings.fbm/tex45.jpg'),
  require('./res/all_buildings.fbm/tex62.jpg'),
  require('./res/all_buildings.fbm/tex760.jpg'),
  require('./res/all_buildings.fbm/tex93.jpg'),
  require('./res/all_buildings.fbm/ost_west.jpg'),
  require('./res/all_buildings.fbm/tex111.jpg'),
  require('./res/all_buildings.fbm/tex129.jpg'),
  require('./res/all_buildings.fbm/tex197.jpg'),
  require('./res/all_buildings.fbm/tex24176.jpg'),
  require('./res/all_buildings.fbm/tex25.jpg'),
  require('./res/all_buildings.fbm/tex31511.png'),
  require('./res/all_buildings.fbm/tex31530.png'),
  require('./res/all_buildings.fbm/tex46.jpg'),
  require('./res/all_buildings.fbm/tex63.jpg'),
  require('./res/all_buildings.fbm/tex761.jpg'),
  require('./res/all_buildings.fbm/tex94.jpg'),
  require('./res/all_buildings.fbm/seite.jpg'),
  require('./res/all_buildings.fbm/tex112.jpg'),
  require('./res/all_buildings.fbm/tex13.jpg'),
  require('./res/all_buildings.fbm/tex198.jpg'),
  require('./res/all_buildings.fbm/tex24177.jpg'),
  require('./res/all_buildings.fbm/tex26.jpg'),
  require('./res/all_buildings.fbm/tex31512.png'),
  require('./res/all_buildings.fbm/tex31531.png'),
  require('./res/all_buildings.fbm/tex47.jpg'),
  require('./res/all_buildings.fbm/tex64.jpg'),
  require('./res/all_buildings.fbm/tex762.jpg'),
  require('./res/all_buildings.fbm/tex95.jpg'),
  require('./res/all_buildings.fbm/seite00.jpg'),
  require('./res/all_buildings.fbm/tex113.jpg'),
  require('./res/all_buildings.fbm/tex14.jpg'),
  require('./res/all_buildings.fbm/tex199.jpg'),
  require('./res/all_buildings.fbm/tex24178.jpg'),
  require('./res/all_buildings.fbm/tex27.jpg'),
  require('./res/all_buildings.fbm/tex31513.png'),
  require('./res/all_buildings.fbm/tex31559.png'),
  require('./res/all_buildings.fbm/tex48.jpg'),
  require('./res/all_buildings.fbm/tex65.jpg'),
  require('./res/all_buildings.fbm/tex763.jpg'),
  require('./res/all_buildings.fbm/tex96.jpg'),
  require('./res/all_buildings.fbm/seite01.jpg'),
  require('./res/all_buildings.fbm/tex114.jpg'),
  require('./res/all_buildings.fbm/tex15.jpg'),
  require('./res/all_buildings.fbm/tex2.jpg'),
  require('./res/all_buildings.fbm/tex24179.jpg'),
  require('./res/all_buildings.fbm/tex28.jpg'),
  require('./res/all_buildings.fbm/tex31514.png'),
  require('./res/all_buildings.fbm/tex31587.png'),
  require('./res/all_buildings.fbm/tex49.jpg'),
  require('./res/all_buildings.fbm/tex66.jpg'),
  require('./res/all_buildings.fbm/tex764.jpg'),
  require('./res/all_buildings.fbm/tex97.jpg'),
  require('./res/all_buildings.fbm/tex0.jpg'),
  require('./res/all_buildings.fbm/tex115.jpg'),
  require('./res/all_buildings.fbm/tex16.jpg'),
  require('./res/all_buildings.fbm/tex21368.jpg'),
  require('./res/all_buildings.fbm/tex24180.jpg'),
  require('./res/all_buildings.fbm/tex29.jpg'),
  require('./res/all_buildings.fbm/tex31515.png'),
  require('./res/all_buildings.fbm/tex32.jpg'),
  require('./res/all_buildings.fbm/tex5.jpg'),
  require('./res/all_buildings.fbm/tex67.jpg'),
  require('./res/all_buildings.fbm/tex765.jpg'),
  require('./res/all_buildings.fbm/tex98.jpg'),
  require('./res/all_buildings.fbm/tex1.jpg'),
  require('./res/all_buildings.fbm/tex116.jpg'),
  require('./res/all_buildings.fbm/tex183.jpg'),
  require('./res/all_buildings.fbm/tex21369.jpg'),
  require('./res/all_buildings.fbm/tex24181.jpg'),
  require('./res/all_buildings.fbm/tex3.jpg'),
  require('./res/all_buildings.fbm/tex31516.png'),
  require('./res/all_buildings.fbm/tex33.jpg'),
  require('./res/all_buildings.fbm/tex50.jpg'),
  require('./res/all_buildings.fbm/tex68.jpg'),
  require('./res/all_buildings.fbm/tex77.jpg'),
  require('./res/all_buildings.fbm/tex99.jpg'),
  require('./res/all_buildings.fbm/tex10.jpg'),
  require('./res/all_buildings.fbm/tex117.jpg'),
  require('./res/all_buildings.fbm/tex184.jpg'),
  require('./res/all_buildings.fbm/tex21370.jpg'),
  require('./res/all_buildings.fbm/tex24182.jpg'),
  require('./res/all_buildings.fbm/tex30.jpg'),
  require('./res/all_buildings.fbm/tex31517.png'),
  require('./res/all_buildings.fbm/tex34.jpg'),
  require('./res/all_buildings.fbm/tex51.jpg'),
  require('./res/all_buildings.fbm/tex69.jpg'),
  require('./res/all_buildings.fbm/tex78.jpg'),
  require('./res/all_buildings.fbm/textur.jpg'),
  require('./res/all_buildings.fbm/tex100.jpg'),
  require('./res/all_buildings.fbm/tex118.jpg'),
  require('./res/all_buildings.fbm/tex185.jpg'),
  require('./res/all_buildings.fbm/tex21371.jpg'),
  require('./res/all_buildings.fbm/tex24183.jpg'),
  require('./res/all_buildings.fbm/tex31.jpg'),
  require('./res/all_buildings.fbm/tex31518.png'),
  require('./res/all_buildings.fbm/tex35.jpg'),
  require('./res/all_buildings.fbm/tex52.jpg'),
  require('./res/all_buildings.fbm/tex7.jpg'),
  require('./res/all_buildings.fbm/tex79.jpg'),
  require('./res/all_buildings.fbm/turm_u00.jpg'),
  require('./res/all_buildings.fbm/tex101.jpg'),
  require('./res/all_buildings.fbm/tex119.jpg'),
  require('./res/all_buildings.fbm/tex186.jpg'),
  require('./res/all_buildings.fbm/tex21372.jpg'),
  require('./res/all_buildings.fbm/tex24184.jpg'),
  require('./res/all_buildings.fbm/tex31500.png'),
  require('./res/all_buildings.fbm/tex31519.png'),
  require('./res/all_buildings.fbm/tex36.jpg'),
  require('./res/all_buildings.fbm/tex53.jpg'),
  require('./res/all_buildings.fbm/tex70.jpg'),
  require('./res/all_buildings.fbm/tex8.jpg'),
  require('./res/all_buildings.fbm/turm_unt.jpg'),
  require('./res/all_buildings.fbm/tex102.jpg'),
  require('./res/all_buildings.fbm/tex12.jpg'),
  require('./res/all_buildings.fbm/tex187.jpg'),
  require('./res/all_buildings.fbm/tex21373.jpg'),
  require('./res/all_buildings.fbm/tex24185.jpg'),
  require('./res/all_buildings.fbm/tex31501.png'),
  require('./res/all_buildings.fbm/tex31520.png'),
  require('./res/all_buildings.fbm/tex37.jpg'),
  require('./res/all_buildings.fbm/tex54.jpg'),
  require('./res/all_buildings.fbm/tex71.jpg'),
  require('./res/all_buildings.fbm/tex80.jpg')]}
  position={[0, .5, -2]}
  scale={[.001, .001, .001]}
type="VRX" />*/
