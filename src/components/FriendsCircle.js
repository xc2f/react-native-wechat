import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, Image, Modal, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';

import ImagePicker from 'react-native-image-picker';


import Statusbar from './StatusBar';
import NavigationBar from './NavigationBar';

var options = {
  title: '选择照片',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '相册',
  cancelButtonTitle: '取消',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class FriendsCircle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerImg: 'xx',
      modalVisible: false,
      avatarSource: null,
    }
    // this._callIamgePicker.bind(this);
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
    clearTimeout(this._timeout);
    this.setState({
      modalVisible: true,
    })

  }

  _selectBannerImg() {
    this.setState({
      modalVisible: false,
    })

  /*modal关闭后调起图片上传服务*/
  // ios下，modal关掉后立即调用image picker，界面会卡住，最好不用modal
  // 这样处理偶然还是会有问题
    this._timeout = setTimeout(function() {
      // if (this.state.modalVisible === false) {
        this._callIamgePicker();
      // }
    }.bind(this), 500);
  }


  _callIamgePicker() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
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
          avatarSource: source,
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
          onRequestClose={()=>{
            '你有什么用';
            {/*this.setState({
              modalVisible: false,
            })*/}
          }}
          style={styles.modal}
        >
          <View style={styles.modalWrap}>
            <View style={styles.modalShade}></View>
            <TouchableHighlight
              onPress={this._selectBannerImg.bind(this)}
              underlayColor='#ddd'
              style={styles.modalTouch}
            >
              <View>
                <Text
                  style={styles.modalText}
                >更换相册封面</Text>
              </View>
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
