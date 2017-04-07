import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, Image, Modal, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import ImagePicker from 'react-native-image-picker';


import Statusbar from './StatusBar';
import NavigationBar from './NavigationBar';


class FriendsCircle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerImg: 'xx',
      modalVisible: false,
    }
  }


  componentWillMount() {
    storage.load({
      key: 'userData'
    })
    .then( res => {
      this.setState({
        bannerImg: res.data[0].avatar
      })

    })
    .catch( err => {
      console.log('Several error occured: ' + err.message );
    })
    .done();
  }

  _onBackPress() {
    this.props.navigator.pop();
  }

  _changeBanner() {
    this.setState({
      modalVisible: true,
    })

  }

_callIamgePicker() {
  console.log('111');
  var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    let source = { uri: response.uri };

    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      avatarSource: source
    });
  }
});

}
  render() {
    return (
      <View style={styles.container}>

        {/*modal*/}
        <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={()=>{'你有什么用'}}
          style={styles.modal}
        >
          <View style={styles.modalWrap}>
            <View style={styles.modalShade}></View>
            <TouchableHighlight
              onPress={() => {
                this.setState({
                  modalVisible: false,
                })

                {/*modal关闭后调起图片上传服务*/}
                this._callIamgePicker();
              }}
              underlayColor='#ddd'
              style={styles.modalTouch}
            >
              <Text
                style={styles.modalText}
              >更换相册封面</Text>
            </TouchableHighlight>
            <View style={styles.modalShade}></View>
          </View>
        </Modal>


       <Statusbar />
        <View style={styles.nav}>
          <NavigationBar
            hasBack={true}
            subTitle='朋友圈'
            handleBackPress={this._onBackPress.bind(this)}
          />
        </View>
        <View style={styles.body}>
          <ScrollView>
            <View style={styles.bannerImgWrap}>
              <TouchableWithoutFeedback
                onPress={this._changeBanner.bind(this)}
              >
                <Image
                  source={{
                    uri: this.state.bannerImg
                  }}
                  resizeMode='cover'
                  style={styles.bannerImg}
                />
              </TouchableWithoutFeedback>
              <Image
                source={{
                  uri: this.state.bannerImg
                }}
                style={styles.avatar}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  nav: {
    paddingTop: Platform.OS === 'ios' ? 20 : 17,
    backgroundColor: '#313436',
    flex: 1,
  },
  body: {
    flex: 11,
    backgroundColor: '#000',
  },
  bannerImgWrap: {
    height: 200,
    // width: '100%',
  },
  bannerImg: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    width: 70,
    height: 70,
    position: 'absolute',
    right: 10,
    bottom: -30,
    zIndex: 999,
  },
  modalWrap: {
    backgroundColor: 'rgba(0, 0, 0, .4)',
    // justifyContent: 'center',
    // alignSelf: 'center',
    // height: 30,
    // top: '50%',
    // flexDirection: 'row'
    // width: '50%',
    flex: 1,
    alignItems: 'center',
  },
  modalShade: {
    flex: 10,
  },
  modalTouch: {
    backgroundColor: '#fff',
    width: '50%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    // color: '#fff',
  }
})

export default FriendsCircle;
