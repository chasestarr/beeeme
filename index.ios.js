import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Vibration
} from 'react-native';
import Camera from 'react-native-camera';
import Proximity from 'react-native-proximity';
import Video from 'react-native-video';
// import RNFS from 'react-native-fs';

class beeeme extends Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.state = { isRecording: false, captured: false, lastCapture: 'placeholder' };
  }

  render() {
    if(this.state.captured === true){
      console.log('##### last cap below #####')
      console.log('last cap:', this.state.lastCapture)
      return(
        <View style={styles.container}>

          <Text style={styles.capture} onPress={this.toggleCaptured.bind(this)}>Close Preview</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Camera
            ref="camera"
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>

            <TouchableHighlight
            style={styles.wrapper}
            onPress={() => this.vibe()}>
            <View style={styles.button}>
              <Text>Vibrate</Text>
            </View>
          </TouchableHighlight>
          </Camera>
        </View>
      );
    }
  }

  isProximity(){
    if(this.state.proximity === true){
      if( this.refs.camera ) {
        this.refs.camera.capture({
          audio: true,
          mode: Camera.constants.CaptureMode.video,
          target: Camera.constants.CaptureTarget.cameraRoll
        })
          .then( ( data ) => {
            // let base64Img = data.path;
            console.log('########')
            console.log('path:', data.path);
            this.setState('data:', {lastCapture: data.path});
            // RNFS.readFile( base64Img, 'base64' )
            //   .then( res => this.setState( { lastCapture: res } ) )
          });
      }

      this.setState({isRecording: true});
    } else if(this.state.proximity === false && this.state.isRecording === true){
      this.refs.camera.stopCapture();
      this.setState({isRecording: false});
      this.toggleCaptured();
    }
  }

  toggleCaptured(){
    this.setState({
      captured: !this.state.captured
    })
  }

  vibe(){
    console.log('vibing');
    Vibration.vibrate();
  }

  componentDidMount(){
    Proximity.addListener(this._setProximity.bind(this));
  }

  _setProximity(data) {
    this.setState({
      proximity: data.proximity,
    });
    this.isProximity();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
  }
});

AppRegistry.registerComponent('beeeme', () => beeeme);
