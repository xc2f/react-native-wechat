import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, Image, Modal, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';

import ImagePicker from 'react-native-image-picker';


import Statusbar from './StatusBar';
import NavigationBar from './NavigationBar';
import FriendsCircleModal from './FriendsCircleModal';

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

  _onCameraIconPress() {
    this.props.navigator.push({
      component: FriendsCircleModal,
    })
  }

  _changeBanner() {
    clearTimeout(this._timeout);
    this.setState({
      modalVisible: true,
    })

  }

  // 点击上下空白区域隐藏modal
  _hiddenModal() {
    this.setState({
      modalVisible: false,
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
          avatarSource: source.uri,
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>

        {/*modal*/}
        <FriendsCircleModal
          visible={this.state.modalVisible}
          hiddenModal={this._hiddenModal.bind(this)}
          changeBanner={this._selectBannerImg.bind(this)}
        />


        <Statusbar />
        <View style={styles.nav}>
          <NavigationBar
            hasBack={true}
            subTitle='朋友圈'
            handleBackPress={this._onBackPress.bind(this)}
            handleIconPress={this._onCameraIconPress.bind(this)}
            hasCamera={true}
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
                    uri: this.state.avatarSource || this.state.bannerImg
                  }}
                  resizeMode='cover'
                  style={styles.bannerImg}
                />
              </TouchableWithoutFeedback>
              <View style={styles.avatarWrap}>
                <Image
                  source={{
                    uri: this.state.bannerImg
                  }}
                  style={styles.avatar}
                />
              </View>
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
    // backgroundColor: '#000',
  },
  bannerImgWrap: {
    height: 200,
    // width: '100%',
  },
  bannerImg: {
    width: '100%',
    height: '100%',
  },
  avatarWrap: {
    borderWidth: 1,
    borderColor: '#aaa',
    width: 70,
    height: 70,
    position: 'absolute',
    right: 10,
    bottom: -30,
    padding: 1,
    backgroundColor: '#eee',
  },
  avatar: {
    width: '100%',
    height: '100%',
    // zIndex: 999,
  },
  modalWrap: {
    backgroundColor: 'rgba(0, 0, 0, .4)',
    // justifyContent: 'center',
    // alignSelf: 'center',
    // height: 30,
    // top: '50%',
    // flexDirection: 'row',
    // width: '50%',
    flex: 1,
    alignItems: 'center',
  },
  modalShade: {
    width: '100%',
    flex: 10,
  },
  shadeTouch: {
    width: '100%',
    height: '100%',
  },
  modalTouch: {
    backgroundColor: '#fff',
    width: '50%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  modalText: {
    // color: '#fff',
  }
})

export default FriendsCircle;
