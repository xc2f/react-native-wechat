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
    if (this.props.newPost) {
      const newList = this._list;
      newList.unshift(this.props.newPost);

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
    console.log('imgs' + data.imgs.length);

    return (
      <View style={styles.container}>
        <View style={styles.avatar}></View>
        <View style={styles.postWrap}>
          <Text style={styles.userName}>user</Text>
          <Text style={styles.postContent}>{data.text}</Text>
          <View style={[styles.imgs, styles.imgWrap2]}>
            {data.imgs.map((item, idx) => {
              return (
                <Image
                  key={idx}
                  source={{
                    uri: item.uri
                  }}
                  style={styles['imgs' + data.imgs.length]}
                />
              )
            })}
          </View>
          <View style={styles.bottomInfo}>
            <Text style={styles.time}>{computeTime(data.time)}</Text>
            <Text style={styles.location}>{data.location}</Text>
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

  render() {
    console.log(this._list);

    return (
      <View>
        <Button
          title='清除数据'
          onPress={this._clearPosts.bind(this)}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    flex: 2,
  },
  postWrap: {
    flex: 8,
  },
  userName: {
    color: '#50B8FB',
    fontSize: 17,
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
    color: '#0079CB'
  },
  imgs: {
    marginBottom: 10,
  },
  imgs1: {
    width: '90%',
    height: 200,
  },
  imgWrpa2: {
    flexDirection: 'row',
  },
  imgs2: {
    flex: 1,
    height: 100,
    // marginRight: '5%',
  }
})

export default FirendCirclePosts;
