import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight, Image, StyleSheet } from 'react-native';

import JsonData from '../config/data.json';

import ChatPage from '../components/ChatPage';


export default class Home extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(JsonData),
    };
    this._renderRow = this._renderRow.bind(this);
    this._renderRowContent = this._renderRowContent.bind(this);
    // this._rowClick = this._rowClick.bind(this);
  }

  _rowClick(data) {
    this.props.navigator.push({
      component: ChatPage,
      args: {
        data: data,
      }
    })
  }


  _renderRow(rowData, rowID) {
    return (
      <TouchableHighlight
        key={rowID}
        underlayColor='#ccc'
        onPress={this._rowClick.bind(this, rowData)}
      >
        {this._renderRowContent(rowData)}
      </TouchableHighlight>
    )
  }

  _renderRowContent(rowData) {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.avatar}>
          <Image
            source={require('../images/user.jpg')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View style={styles.info}>
          <View style={styles.info1}>
            <Text style={styles.title}>{rowData.title}</Text>
            <Text style={styles.date}>{rowData.date}</Text>
          </View>
          <View style={styles.info2}>
            <Text style={styles.desc}>{rowData.desc}</Text>
          </View>
        </View>
      </View>
    )
  }

  _renderSeparator(separatorKey) {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        }}
        key={'separator' + Math.random() }
      />
    )
  }
  render() {
    return (
      <View style={styles.listContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 7,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 7,
    paddingRight: 15,
    paddingBottom: 7,
    paddingLeft: 13,
    height: 65,
  },
  avatar: {
    flex: 1,
  },
  info: {
    flex: 5,
    paddingLeft: 13,
  },
  info1: {
    flex: 1,
    flexDirection: 'row',
  },
  info2: {
    flex: 1,
  },
  title: {
    flex: 5,
    alignSelf: 'center',
    fontSize: 17,
    color: '#555',
  },
  date: {
    flex: 5,
    textAlign: 'right',
    fontSize: 12,
    color: '#aaa'
  },
  desc: {
    color: '#999',
    fontSize: 14,
    paddingTop: 5,
  }
})
