import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, Image, Modal, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';

import ImagePicker from 'react-native-image-picker';


import Statusbar from './StatusBar';
import NavigationBar from './NavigationBar';
import FriendsCircleModal from './FriendsCircleModal';
import newsEdit from './newsEdit';

import PostLists from './FriendCirclePosts';

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
      // 顶部banner
      bannerImg: 'xx',
      // modal显示
      modalVisible: false,
      // 头像源
      avatarSource: null,
      // 改变顶部banner的modal
      changeBannerModal: false,
      // 发布新消息的modal
      postNewsModal: false,

      // posts list
      newPost: null,
    }
    // this._callIamgePicker.bind(this);
    this._selectBannerImg = this._selectBannerImg.bind(this);
    this._postHandle = this._postHandle.bind(this);
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

  _onCameraIconPress(idx) {
    this.setState({
      modalVisible: true,
      postNewsModal: true,
    })
  }

  // 点击顶部banner
  _changeBanner() {
    clearTimeout(this._timeout);
    this.setState({
      modalVisible: true,
      changeBannerModal: true,
    })

  }

  // 点击上下空白区域隐藏modal
  _hiddenModal() {
    this.setState({
      modalVisible: false,
      changeBannerModal: false,
      postNewsModal: false,
    })
  }


  // 更换相册封面
  _selectBannerImg(idx) {
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

  _receivePost(data){
    // receive new post
    this.setState({
      newPost: data,
    })

  }

  _postHandle(idx) {
    // 0是第一行拍摄，1是第二行从相册选择
      this.setState({
        modalVisible: false,
        postNewsModal: false,
      })
      // console.log(idx);
      clearTimeout(_timeout)
    if (idx === 0) {
      // Open Image Library:
      var _timeout = setTimeout(function() {
        ImagePicker.launchCamera(options, (response)  => {
          console.log('camera');
        });
      }, 500);
    } else if (idx === 1) {
      // Open Image Library:
      var _timeout = setTimeout(function() {
        ImagePicker.launchImageLibrary(options, (response)  => {

          if (!response.didCancel) {
            this.props.navigator.push({
              component: newsEdit,
              args: {
                res: response,
                transferPost: this._receivePost.bind(this),
              }
            })
          }
        });
      }.bind(this), 500);
    }
  }

  render() {

    return (
      <View style={styles.container}>

        {/*modal*/}
        {/*顶部banner*/}
        <FriendsCircleModal
          visible={this.state.modalVisible && this.state.changeBannerModal}
          hiddenModal={this._hiddenModal.bind(this)}
          elements={[
            {
              title: '更换相册封面',
              handle: this._selectBannerImg,
            }
          ]}
        />

        {/*发布新动态*/}
        <FriendsCircleModal
          visible={this.state.modalVisible && this.state.postNewsModal}
          hiddenModal={this._hiddenModal.bind(this)}
          elements={[
            {
              title: '拍摄',
              handle: this._postHandle,
            },
            {
              title: '从相册选择',
              handle: this._postHandle,
            }
          ]}
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

            {/*post lists*/}
            <PostLists
              newPost={this.state.newPost}
            />
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
