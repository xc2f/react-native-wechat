import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight, Image, StyleSheet } from 'react-native';


export default class Home extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.data),
    };
  }

  _rowClick(rowData) {
    this.props.handleRowClick(rowData);
  }

  _renderRow(rowData) {
    return (
      <TouchableHighlight
        key={rowData.userId}
        underlayColor='#ccc'
        onPress={this._rowClick.bind(this, rowData)}
      >
        <View style={styles.rowContainer}>
          <View style={styles.avatar}>
            <Image
              source={{
                uri: rowData.avatar
              }}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View style={styles.info}>
            <View style={styles.info1}>
              <Text style={styles.title}>{rowData.userName}</Text>
              <Text style={styles.date}>{rowData.lastDate}</Text>
            </View>
            <View style={styles.info2}>
              <Text style={styles.desc}>{rowData.lastMessage}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
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
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator.bind(this)}
          enableEmptySections={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    // paddingBottom: 7,
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
