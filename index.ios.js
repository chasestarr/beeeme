import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';

let isFilming = false;

class beeeme extends Component {
  constructor() {
    super();
    this.state = { isRecording: false, captured: false };
  }

  render() {
    if(this.state.captured === true){
      return(
        <View></View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Camera
            ref="camera"
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}
            captureMode={Camera.constants.CaptureMode.video}
            captureAudio={true}
            keepAwake={true}>
            <Text style={styles.capture} onPress={this.toggleVideo.bind(this)}>[CAPTURE]</Text>
          </Camera>
        </View>
      );
    }
  }

  takePicture() {
    const options = {
      mode: 'video',
      audio: true
    };
    this.refs.camera.capture(options)
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  toggleVideo() {
    if(isFilming == false){
      this.takePicture();
      setState({isRecording: true});
    } else {
      this.refs.camera.stopCapture();
      setState({isRecording: false});
    }
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
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

AppRegistry.registerComponent('beeeme', () => beeeme);
