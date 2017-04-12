// 朋友圈-新建消息-添加图片那里进去的图片详情页
// 取自父组件的数组在这里操作后返回，原数组变了

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';

import Statusbar from './StatusBar';
import NavigationBar from './NavigationBar';

class SingleImgPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: this.props.idx,
      imgs: this.props.imgs,
    }
  }


  _onBackPress() {
    this.props.navigator.pop();
  }

  _handleDelete() {

    // 图片详情页删除当前图片的操作

    const {idx, imgs} = this.state;
    imgs.splice(idx, 1);

    // console.log('idx: ' + idx);
    // console.log('imgs.length: ' + imgs.length);
    // console.log(imgs);

    if ( imgs.length === 0 ) {
      // 数组如果空了就返回，必须放在第一步判断
      this.props.navigator.pop();
    } else if (idx < imgs.length) {
      // 不是最后一张图片的操作，操作后显示下一张图片
      // 图片数组减1，因此idx顺延下一张
      this.setState({
        idx: idx
      })
    } else if (idx === imgs.length) {
      // 如果idx === 改变后imgs.length，说明idx是最后一张图片，回退到前一张
      this.setState({
        idx: idx-1
      })
    }

  }

  render() {
    const {idx, imgs} = this.state;
    return (
      <View style={styles.container}>
        <Statusbar />
        <View style={styles.nav}>
          <NavigationBar
            subTitle={idx+1 + ' / ' + imgs.length}
            hasBack={true}
            hasDeleteIcon={true}
            handleBackPress={this._onBackPress.bind(this)}
            handleDelete={this._handleDelete.bind(this)}
          />
        </View>
        <View style={styles.body}>
          <Image
            source={{
              uri: imgs[idx].uri
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        {/*<Text>singleimgpage</Text>*/}
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
})

export default SingleImgPage;
