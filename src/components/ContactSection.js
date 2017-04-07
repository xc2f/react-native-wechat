import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, Image, TouchableHighlight } from 'react-native';

class ContactSection extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    // 原数组信息
    this._originList = this.props.originList;

    this.state = {
      dataSource: ds.cloneWithRows(this.props.item)
    };
  }


  render() {
    // 每次调用都会把originList传过来其实不好
    const { item, idx} = this.props;

    let flag = '';
    switch (idx) {
      case 0:
        flag = '*';
        break;
      case 1:
        flag = 'A';
        break;
      case 2:
        flag = 'B';
        break;
      case 3:
        flag = 'C';
        break;
      case 4:
        flag = 'D';
        break;
      case 5:
        flag = 'E';
        break;
      case 6:
        flag = 'F';
        break;
      case 7:
        flag = 'G';
        break;
      case 8:
        flag = 'H';
        break;
      case 9:
        flag = 'I';
        break;
      case 10:
        flag = 'J';
        break;
      case 11:
        flag = 'K';
        break;
      case 12:
        flag = 'L';
        break;
      case 13:
        flag = 'M';
        break;
      case 14:
        flag = 'N';
        break;
      case 15:
        flag = 'O';
        break;
      case 16:
        flag = 'P';
        break;
      case 17:
        flag = 'Q';
        break;
      case 18:
        flag = 'R';
        break;
      case 19:
        flag = 'S';
        break;
      case 20:
        flag = 'T';
        break;
      case 21:
        flag = 'U';
        break;
      case 22:
        flag = 'V';
        break;
      case 23:
        flag = 'W';
        break;
      case 24:
        flag = 'X';
        break;
      case 25:
        flag = 'Y';
        break;
      case 26:
        flag = 'Z';
        break;

      default:
        break;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.flag}>{flag}</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(originListIdx) => {
            const user = this._originList[originListIdx];
            return (
              <TouchableHighlight
                onPress={() => {}}
                underlayColor='#777'
                style={styles.touch}
              >
                <View style={styles.row}>
                  <View style={styles.rowContainer}>
                    <View style={styles.imageWrap}>
                      <Image
                        source={{
                          uri: user.avatar
                        }}
                        style={{
                          width: 35,
                          height: 35,
                        }}
                      />
                    </View>
                    <View style={styles.nameWrap}>
                      <Text style={styles.nameText}>{user.userName}</Text>
                    </View>
                  </View>
                  <View style={styles.division} />
                </View>
              </TouchableHighlight>
            )
          }}
        />

        {/*渲染到单独的函数处理有问题*/}
        {/*<ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this, item)}
        />*/}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  division: {
    alignSelf: 'center',
    width: '95%',
    height: 1,
    // borderBottomWidth: 1,
    backgroundColor: '#eee',
  },
  flag: {
    fontSize: 12,
    padding: 2,
    paddingLeft: 15,
    color: '#777',
  },
  imageWrap: {
    flex: 2,
    alignItems: 'center',
  },
  nameWrap: {
    flex: 12,
    paddingLeft: 7,
  },
  nameText: {
    color: '#222',
  }
})

export default ContactSection;
