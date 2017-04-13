import React, { Component } from 'react';
import { View, Text, Image, ListView, StyleSheet, Button } from 'react-native';

import computeTime from '../config/computeTime';

class FirendCirclePosts extends Component {
  constructor(props) {
    super(props);
    this._ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this._list = [];
    this.state = {
      dataSource: this._ds.cloneWithRows(this._list)
    }

  }


  componentDidMount() {

    storage.load({
      key: 'postNews'
    })
    .then(
      res => {
        // 将本地查找到的信息写入到state
        this._list = res.content;
        this.setState({
          dataSource: this._ds.cloneWithRows(this._list)
        })
    },
      rej => {
        // 首次进入朋友圈，没有找到该字段信息，先新建一个空的
        console.log('empty');
        storage.save({
          key: 'postNews',   // Note: Do not use underscore("_") in key!
          rawData: {
            content: this._list
          },

          // if not specified, the defaultExpires will be applied instead.
          // if set to null, then it will never expire.
          expires: null
        })

      }
    )
    .catch( err => {
      console.log('Several error occured: ' + err.message );
    })
    .done();
  }

  componentWillReceiveProps() {
    // 发布新校消息返回后，如果接收到props的变化通知，更新state，并写入到本地存储
    console.log(this.props.newPost);

    const { newPost } = this.props;

    // 只有在以下情况下进入执行
    //   1，有新消息（必须）
    //   2，数组长度为0（可选，发表第一篇消息的时候用到）
    //   3，新消息的postId与上一篇消息的不同（可选，防止多次推入同一篇消息）
    if ( newPost && ( this._list.length === 0 || newPost.postId !== this._list[0].postId)) {
      console.log('ininin');

      const newList = this._list;
      newList.unshift(newPost);

      storage.save({
        key: 'postNews',   // Note: Do not use underscore("_") in key!
        rawData: {
          content: newList,
        },
      });

      this.setState({
        dataSource: this._ds.cloneWithRows(this._list),
      })
    }
  }

  _renderRow(data) {

    const userData = this.props.userData;
    const idx = Math.floor(Math.random()*userData.length);

    return (
      <View style={styles.container}>
        <View style={styles.avatarWrap}>
          <Image
            source={{
              uri: userData[idx].avatar
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.postWrap}>
          <Text style={styles.userName}>{userData[idx].userName}</Text>
          <Text style={styles.postContent}>{data.text}</Text>
          <View style={[styles.imgs, styles['imgWrap' + data.imgs.length]]}>
            {data.imgs.map((item, idx) => {
              return (
                <Image
                  key={idx}
                  source={{
                    uri: item.uri
                  }}
                  resizeMode='contain'
                  style={styles['imgs' + data.imgs.length]}
                />
              )
            })}
          </View>
          <View style={styles.bottomInfo}>
            <Text style={styles.time}>{computeTime(data.time)}</Text>
            <Text style={styles.location}>{data.location === 'unknow' ? '' : data.location}</Text>
          </View>
        </View>
      </View>
    )
  }

  _clearPosts() {
    storage.remove({
	    key: 'postNews'
    });
    this._list = [];
    this.setState({
      dataSource: this._ds.cloneWithRows(this._list)
    })
  }

  _renderSeparator() {
    return (
      <View
        key={Math.random()}
        style={styles.division}
      />
    )
  }

  render() {
    console.log(this.props);

    return (
      <View>
        <Button
          title='清除数据'
          onPress={this._clearPosts.bind(this)}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator.bind(this)}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
  },
  avatarWrap: {
    flex: 1.5,
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  postWrap: {
    flex: 8,
  },
  userName: {
    color: '#022EBC',
    fontSize: 15,
  },
  postContent: {
    marginTop: 5,
    marginBottom: 10,
  },
  bottomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  time: {
    flex: 3,
    fontSize: 12,
    color: '#777',
  },
  location: {
    flex: 7,
    fontSize: 11,
    color: '#0079CB'
  },
  imgs: {
    marginBottom: 10,
  },
  imgs1: {
    width: '90%',
    height: 200,
  },
  imgWrap2: {
    flexDirection: 'row',
    marginRight: '5%',
  },
  imgs2: {
    flex: 1,
    height: 100,
    marginRight: '5%',
  },
  imgWrap3: {
    flexDirection: 'row',
    marginRight: '8%',
  },
  imgs3: {
    flex: 1,
    height: 70,
    marginRight: '2%',
  },
  division: {
    height: .5,
    width: '100%',
    backgroundColor: '#ddd',
    marginTop: 10,
    marginBottom: 10,
  }
})

export default FirendCirclePosts;
