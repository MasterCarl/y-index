import React from  'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';
import {
  SCREENS
} from '../App.js';
import {
  COLORS
} from './Styles.js';
import { SliderEntry } from './SliderEntry.js';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Carousel from 'react-native-snap-carousel';
import api from './api';

const options = {
  title: 'Select Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export class SubmitIssue extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      imageSource: null,
      imageData: null,
      selectedTopic: null,
      description: null,
      imageType: null,
      fileName: null,
    };
    this.takePhoto = this.takePhoto.bind(this);
  }
  takePhoto() {
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    const parent = this;
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        const nextState = Object.assign({}, this.state, {
          imageSource: source,
          imageData: response.data,
          imageType: response.type,
          fileName: response.fileName,
        });
        this.setState(nextState);
        console.log('taken photo');
        setTimeout(function () {
          console.log('submitting');
          parent.onSubmit(nextState);
        }, 1000);
        
      }
    });
  }

  renderSliderItem({item, index}, parallaxProps) {
    return (
      <SliderEntry
            data={item}
            even={(index + 1) % 2 === 0}
            parallax={true}
            parallaxProps={parallaxProps}
      />
    );
  }

  onSubmit(nextState) {
    console.log(nextState);
    const { imageSource, imageData, selectedTopic, description, fileName, imageType } = nextState;
    console.log(this.state);
    const url = api.uploadFile(api.makeid(), imageData, imageSource, imageType, fileName).then((url) => {
      console.log('uploaded image', url);
      const venueId = null;
      const location = null;
      api.createIssue(venueId, url, description, location)
          .then(_ => console.log('success'))
          
    }).catch(console.error);

  }
  
  render() {
    const { imageSource } = this.state;
    console.log(imageSource);
    const { width, height } = Dimensions.get('window');
    const slideWidth = (75 * width)/100;
    const itemHorizontalMargin = (2 * width)/100;;
    const itemWidth = slideWidth + itemHorizontalMargin * 2;
    return (
      <ScrollView ref={(scroller) => {this.scroller = scroller}} style={{ backgroundColor: COLORS.Background, height: '100%', width: '100%', }}>
        <View style={{ height: height, position: 'relative' }}>
          <Text style={{ fontSize: 34, fontWeight: 'bold', textAlign: 'left', marginLeft: 20, marginTop: 20}}>Submit Idea</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'left', marginLeft: 20, marginTop: 2}}>Describe your idea:</Text>
          <TextInput
              style={{borderWidth: 1, backgroundColor: COLORS.TextInput, color: COLORS.Blue1, paddingLeft: 20, textAlignVertical: 'top'}}
              multiline={true}
              numberOfLines={8}
              placeholder="What is on your mind?"
              placeholderTextColor={COLORS.Blue5}
              onChangeText={(text) => this.setState({ description: text})}
            />
          <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold', textAlign: 'left', marginLeft: 20, marginTop: 2}}>Select most appropriate topic:</Text>
          <Carousel
            style={{ marginBottom: 0, height: 200 }}
            data={ENTRIES}
            renderItem={this.renderSliderItem}
            sliderWidth={width}
            itemWidth={itemWidth}
            onSnapToItem={(index) => this.setState({ selectedTopic: ENTRIES[index].index }) }
          />
          <TouchableOpacity style={[styles.submitButton, { position: 'absolute', top: 520, width: '100%' }]} onPress={() => this.scroller.scrollTo({x: 0, y: height})}>
            <Text style={{ textAlign: 'center', fontSize: 18, paddingTop: 5}}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: height }}>
          <Text style={{ fontSize: 34, fontWeight: 'bold', textAlign: 'left', marginLeft: 20, marginTop: 20}}>
            Add a photo
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'left', marginLeft: 20, marginTop: 2}}>
            To illustrate your idea even better
          </Text>
          {imageSource !== null && <Image source={imageSource} style={[styles.photo]} resizeMode="contain" />}
          <TouchableOpacity style={[styles.submitButton, { marginTop: 100 }]} onPress={() => this.takePhoto()}>
            <Icon name="add-a-photo" size={20} color="#FFF" style={{ position: 'absolute', left: 50, top: 15 }} />
            <Text style={{ textAlign: 'center', fontSize: 18, paddingTop: 5}}>Take a phote and submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  photoButton: {
    backgroundColor: COLORS.Blue3,
    width: '90%',
    height: 30,
    marginLeft: '5%',
    marginTop: 10,
    marginBottom: 10,    
  },
  submitButton: {
    backgroundColor: COLORS.Blue5, marginTop: 50, height: 50, paddingTop: 8,
  },
  photo: {
    height: '70%',
  }
});

const ENTRIES = [
  {
      title: 'Schule',
      subtitle: 'Education and schools',
  },
  {
      title: 'Familien',
      subtitle: 'Family business',
  },
  {
      title: 'Kindergarten',
      subtitle: 'After school',
  },
];