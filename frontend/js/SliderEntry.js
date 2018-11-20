import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, Dimensions, StyleSheet } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';

export class SliderEntry extends Component {
    constructor(props) {
      super(props);
      this.familyImage = require('./assets/family.jpg');
      this.schoolImage = require('./assets/kindergarten.jpg');
      this.kindergartenImage = require('./assets/school.jpg');
    }
    get image () {
        const { data: { title }, parallax, parallaxProps, even } = this.props;
        let image = require('./assets/family.jpg');
        if (title == 'Kindergarten') {
          image = require('./assets/kindergarten.jpg');
        } else if (title == 'Schule') {
          image = require('./assets/school.jpg');
        }
        return parallax ? (
          <Image
              source={image}
              style={styles.image}
              resizeMethod="scale"
            />
        ) : (
            <Image
              source={{ uri: illustration }}
              style={styles.image}
            />
        );
    }

    render () {
        const { data: { title, subtitle }, even } = this.props;

        const uppercaseTitle = title ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { alert(`You've clicked '${title}'`); }}
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { subtitle }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = 250;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

const styles = StyleSheet.create({
  slideInnerContainer: {
      width: itemWidth,
      height: slideHeight,
      paddingHorizontal: itemHorizontalMargin,
      paddingBottom: 18 // needed for shadow
  },
  shadow: {
      position: 'absolute',
      top: 0,
      left: itemHorizontalMargin,
      right: itemHorizontalMargin,
      bottom: 18,
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 10,
      borderRadius: entryBorderRadius
  },
  imageContainer: {
      flex: 1,
      marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderTopLeftRadius: entryBorderRadius,
      borderTopRightRadius: entryBorderRadius
  },
  imageContainerEven: {
      backgroundColor: '#000'
  },
  image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
      borderRadius: IS_IOS ? entryBorderRadius : 0,
      borderTopLeftRadius: entryBorderRadius,
      borderTopRightRadius: entryBorderRadius
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: entryBorderRadius,
      backgroundColor: 'white'
  },
  radiusMaskEven: {
      backgroundColor: '#000'
  },
  textContainer: {
      justifyContent: 'center',
      paddingTop: 20 - entryBorderRadius,
      paddingBottom: 20,
      paddingHorizontal: 16,
      backgroundColor: 'white',
      borderBottomLeftRadius: entryBorderRadius,
      borderBottomRightRadius: entryBorderRadius
  },
  textContainerEven: {
      backgroundColor: '#000'
  },
  title: {
      color: '#000',
      fontSize: 13,
      fontWeight: 'bold',
      letterSpacing: 0.5
  },
  titleEven: {
      color: 'white'
  },
  subtitle: {
      marginTop: 6,
      color: '#AAA',
      fontSize: 12,
      fontStyle: 'italic'
  },
  subtitleEven: {
      color: 'rgba(255, 255, 255, 0.7)'
  }
});