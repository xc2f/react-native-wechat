// 朋友圈右上角添加图片后的编辑页面

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, ScrollView, Image, TouchableHighlight, WebView } from 'react-native';
import NavigationBar from './NavigationBar';
import Statusbar from './StatusBar';
import Modal from './FriendsCircleModal';

import ImagePicker from 'react-native-image-picker';
import Row from './entryRow';
import SingleImgPage from './SingleImgPage';

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
      // 图片添加相关
      addImg: false,
      imgs: [],

      // 定位的webview
      loadWebView: false,

      // 获取到定位
      freshLocation: false,

      textinputValue: '',
    }
    // 将前一步选择的图片存到数组
    this.state.imgs.push(this.props.res)

    this._postHandle = this._postHandle.bind(this);
    this._setLocation = this._setLocation.bind(this);

    this._webview = null;

    // 经纬度
    this._latitude = 'unknow';
    this._longitude = 'unkonw';
    this._location = 'unknow';

    // 输入的值
    this._textinput = null;

    // 内容详情
    this._content = {};
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

    this._content.text = this.state.textinputValue;
    this._content.imgs = this.state.imgs;
    this._content.location = this._location;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1<10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
    let day = date.getDate()<10 ? '0'+date.getDate() : date.getDate();
    let hour = date.getHours()<10 ? '0'+date.getHours() : date.getHours();
    let minute = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
    let seconds = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
    // 遇到位数为一位的时间就跪了
    // let [ year, month, day, hour, minute, seconds ] = [ date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds() ];
    let time = `${year}-${month}-${day}T${hour}:${minute}:${seconds}`
    // console.log(time);

    this._content.time = time;
    // console.log(this._content);

    this._content.postId = Math.random();


    // console.log(this._content);

    // 如果有postNews这个key, push； 否则，新建
    // storage.load({
    //   key: 'postNews'
    // })
    // .then(
    //   res => {
    //     // res.content.push(this._content);

    // },
    //   reject => {
    //     console.log('error in reject');

    //     // // 没有找到postNews key, 新建一个
    //     // storage.save({
    //     //   key: 'postNews',   // Note: Do not use underscore("_") in key!
    //     //   rawData: {
    //     //     content: [this._content],
    //     //   },

    //     //   // if not specified, the defaultExpires will be applied instead.
    //     //   // if set to null, then it will never expire.
    //     //   expires: null,
    //     // });
    // })

        // storage.save({
        //   key: 'postNews',   // Note: Do not use underscore("_") in key!
        //   rawData: {
        //     content: [this._content],
        //   },

        //   // if not specified, the defaultExpires will be applied instead.
        //   // if set to null, then it will never expire.
        //   expires: null,
        // });

    // console.log(storage);

    // alert('post!');
    this.props.transferPost(this._content);
    this.props.navigator.pop();
  }

  _setLocation() {
    if (this.state.loadWebView) {
      this._webview.postMessage('give me location')
    } else {
      this._location = '小伙子，关掉GPS';
      this.setState({
        freshLocation: true,
      })
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._latitude = position.coords.latitude;
        this._longitude = position.coords.longitude;
        // console.log(`http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${this._latitude},${this._longitude}&output=json&pois=1&ak=416QLTjxtatADsMc6lUhR4fcaghoY8C1`);

        this.setState({
          loadWebView: true,
        })
        // 无法自动调用
        // this._webview.postMessage('give me location');
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    )

  }

  _onMessage(e) {

    // this._location = e.nativeEvent.data.match(/formatted_address":"\S+?"/)[0].match(/:"\S+"/)[0].slice(2, -1);

    this._location = JSON.parse(e.nativeEvent.data.replace(/<.*?>/, '').replace(/renderReverse.*?\(/, '').replace(/<.*?>/, '').slice(0, -1)).result.formatted_address;
    this.setState({
      freshLocation: true,
    })
  }

  // 点击图片详情页
  _touchImg(idx) {
    this.props.navigator.push({
      component: SingleImgPage,
      args: {
        idx: idx,
        imgs: this.state.imgs,
      },
    })
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
                onChangeText={value => this.setState({textinputValue: value})}
                value={this.state.textinputValue}
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
                    <TouchableHighlight
                      onPress={this._touchImg.bind(this, idx)}
                    >
                      <Image
                        source={{
                          uri: item.uri
                        }}
                        style={styles.thumbnailContent}
                      />
                    </TouchableHighlight>
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
          {this.state.freshLocation ?
            <View style={styles.location}>
              <Row
                iconName='md-pin'
                iconColor='#ddd'
                title={this._location}
                handleClick={this._setLocation}
              />
            </View>
            :
            <View style={styles.location}>
              <Row
                iconName='md-pin'
                iconColor='#ddd'
                title='所在位置'
                handleClick={this._setLocation}
              />
            </View>
          }

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
          {this.state.loadWebView ?
            <WebView
              source={{
                uri: `http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${this._latitude},${this._longitude}&output=json&pois=1&ak=416QLTjxtatADsMc6lUhR4fcaghoY8C1`
              }}
              ref={webview => { this._webview = webview; }}
              onMessage={this._onMessage.bind(this)}
              injectedJavaScript="document.addEventListener('message', function(){window.postMessage(document.body.innerHTML)});"
              style={{
                flex: 0,
              }}
            />
            :
            <View />
          }

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
