import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight, Image, StyleSheet } from 'react-native';

import JsonData from '../config/data.json';

export default class Contacts extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(JsonData),
      headerInfo: [
        {
          icon: 'data:image/png;base64,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',
          title: '新的朋友'
        },
        {
          icon: 'data:image/png;base64,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',
          title: '群聊'
        }
      ]
    }
  }

  _renderHeader() {
    return (
      <View style={styles.headerContainer}>
        {
          this.state.headerInfo.map( (item, idx) => {

            // 注意箭头函数的this自动绑定
            return this._renderRow(item, idx)
          } )
        }
      </View>
    )
  }

  _renderRow(data, id) {

    return (
      <View style={styles.rowContainer}
        key={id}
      >
        <TouchableHighlight
          onPress={() => {}}
          underlayColor='#eee'
          style={styles.touch}
        >
          <View style={styles.innerWrap}>
            <View style={styles.imgContainer}>
              <Image
                source={{
                  uri: data.icon
                }}
                style={{
                  width: '70%',
                  height: '70%',
                }}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{data.title}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }


  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderHeader={this._renderHeader.bind(this)}
          renderRow={this._renderRow.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // 最后一行高度不够，此乃偏方，后期需要查明原因
    paddingBottom: 7
  },
  rowContainer: {
    // height: 50,
  },
  innerWrap: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  imgContainer: {
    flex: 2,
    justifyContent: 'center',
    // alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 10,
    justifyContent: 'center',
    height: 50,
  },
  titleText: {
    color: '#222',
    fontSize: 15
  },
  touch: {
    flex: 1,
    height: 50,
  }
})
