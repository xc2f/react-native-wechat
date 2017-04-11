// 朋友圈右上角添加图片后的编辑页面

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, ScrollView, Image, TouchableHighlight, WebView } from 'react-native';
import NavigationBar from './NavigationBar';
import Statusbar from './StatusBar';
import Modal from './FriendsCircleModal';

import ImagePicker from 'react-native-image-picker';
import Row from './entryRow';

// load baidumap


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

class newEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      addImg: false,
      imgs: [],
    }
    // 将前一步选择的图片存到数组
    this.state.imgs.push(this.props.res)

    this._postHandle = this._postHandle.bind(this);

    this._webview = null;
  }

  _onBackPress() {
    this.props.navigator.pop();
  }

  _hiddenModal() {
    this.setState({
      modalVisible: false,
    })
  }

  _postHandle(idx) {
    this.setState({
      modalVisible: false,
    })

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
            // 我以为设为true后只会渲染新添加的一次，没想到每次添加都会渲染
            this.state.imgs.push(response);
            this.setState({
              addImg: true,
            })
          }
        });
      }.bind(this), 500);
    }
  }

  _setModalVisible() {
    this.setState({
      modalVisible: true,
    })
  }

  _post() {
    alert('post!');
  }

  _setLocation() {
    fetch('http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=39.983424,116.322987&output=json&pois=1&ak=416QLTjxtatADsMc6lUhR4fcaghoY8C1')
      .then(res => {
        // return res.json()
        // console.log(res);

      })
      .then(resJson => {
        // console.log(resJson);
      })

    this._webview.postMessage('"Hello" from React Native!');
  }

  componentDidMount() {

  }

  _onMessage(e) {
    alert(1)

  }


  render() {
    let { addImg, imgs } = this.state;
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.modalVisible}
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
            hasPostButton={true}
            handleBackPress={this._onBackPress.bind(this)}
            handlePost={this._post.bind(this)}
          />
        </View>
        <View style={[styles.body, styles.setBorder]}>
          <View style={[styles.edit, styles.setBorder]}>
            <View style={[styles.input, styles.setBorder]}>
              <TextInput
                placeholder='这一刻的想法呐...'
                autoFocus={true}
                multiline={true}
                numberOfLines={3}
                underlineColorAndroid='transparent'
                style={styles.inputContent}
              />
            </View>
            <View style={styles.thumbnail}>

            { addImg || imgs.length > 0 ?
              imgs.map( (item, idx) => {
                return (
                  <View
                    key={idx}
                    style={styles.thumbnailItem}
                  >
                    <Image
                      source={{
                        uri: item.uri
                      }}
                      style={styles.thumbnailContent}
                    />
                  </View>
                )
              })
              :
              (<View />)
            }
            {/*多于3张图片不再上传*/}
            {
              imgs.length <3 ?
                (
                  <View
                    style={[styles.thumbnailItem, styles.addImg]}
                  >
                  <TouchableHighlight
                    onPress={this._setModalVisible.bind(this)}
                    underlayColor='#eee'
                    style={styles.addImgTouch}
                  >
                    <Text
                      style={styles.addImgPlus}
                    >
                      +
                    </Text>
                  </TouchableHighlight>
                  </View>
                )
                :
                (<View />)
            }

            </View>
          </View>
          <View style={styles.location}>
              <Row
                iconName='md-pin'
                iconColor='#ddd'
                title='所在位置'
                handleClick={this._setLocation.bind(this)}
              />
          </View>

          <View style={styles.bottomControl}>
            <View style={styles.rowSection}>
              <Row
                iconName='ios-finger-print-outline'
                iconColor='#ccc'
                title='谁可以看'
                handleClick={()=>{}}
              />
            </View>
            <View
              style={styles.division}
            />
            <View style={styles.rowSection}>
              <Row
                iconName='ios-at-outline'
                iconColor='#ccc'
                title='提醒谁看'
                handleClick={()=>{}}
              />
            </View>
          </View>
          <View
            style={styles.bbottom}
          >
          <WebView
            source={{
              uri: 'http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=39.983424,116.322987&output=json&pois=1&ak=416QLTjxtatADsMc6lUhR4fcaghoY8C1'
            }}
            ref={webview => { this._webview = webview; }}
            onMessage={this._onMessage.bind(this)}
          />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  // setBorder: {
  //   borderWidth: 1,
  //   borderColor: 'red',
  // },
  nav: {
    paddingTop: Platform.OS === 'ios' ? 20 : 17,
    backgroundColor: '#313436',
    flex: 1,
  },
  body: {
    flex: 11,
    // marginTop: 20,
  },
  edit: {
    flex: 3,
    // paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  bottomControl: {
    flex: 1.5,
    marginTop: 20,
    justifyContent: 'center',
  },
  rowSection: {
    backgroundColor: '#fff',
  },
  bbottom: {
    flex: 3,
  },
  input: {
    flex: 5,
    // height: 100,
  },
  inputContent: {
    color: '#333',
    fontSize: 13,
    flex: 1,
    height: 100,
  },
  thumbnail: {
    flex: 4,
    flexDirection: 'row',
  },
  thumbnailItem: {
    width: '25%',
    // height: 80,
    marginRight: 10,
    marginBottom: 10,
  },
  thumbnailContent: {
    width: '100%',
    height: '100%',
  },
  addImg: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addImgTouch: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImgPlus: {
    fontSize: 17,
    fontWeight: '100',
    color: '#777',
  },
  location: {
    // flex: 2,
    backgroundColor: '#fff',
  },
  division: {
    // flex: 1,
    // height: 1,
    width: '90%',
    alignSelf: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
  }
})

export default newEditPage;
