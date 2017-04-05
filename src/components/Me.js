import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Row from './entryRow';

class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: '',
    }
    this.handleClick_ = this._clickRow.bind(this);
  }
  componentWillMount() {
    storage.load({
      key: 'userData'
    })
    .then( res => {
      this.setState({
        userData: res.data[0]
      })
    })
    .catch( err => {
      console.log('Several error occured: ' + err.message );
    })
    .done()
  }

  _clickRow() {

  }

  render() {
    console.log(this.state.userData);

    return (
      <View style={styles.container}>
        <View style={[styles.section, styles.section1]}>
          <TouchableHighlight
            onPress={() => {}}
            underlayColor='#ddd'
          >
            <View style={styles.touch}>
              <View style={styles.avatar}>
                <Image
                  source={{
                    uri: this.state.userData.avatar
                  }}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
              </View>
              <View style={styles.userInfo}>
                <Text
                  style={{
                    color: '#333'
                  }}
                >{this.state.userData.userName}</Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#999'
                  }}
                >Wc code: xxx</Text>
              </View>
              <View style={styles.qrcodeIcon}>
                <Icon name='qrcode' size={25} color='#777' />
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <View style={[styles.section, styles.section2]}>
          <Row
            title='相册'
            iconName='md-images'
            iconColor='#007ACC'
            handleClick={this._clickRow}
          />
          <View style={styles.division} />
          <Row
            title='收藏'
            iconName='ios-cube'
            iconColor='#E05848'
            handleClick={this._clickRow}
          />
        </View>
        <View style={[styles.section, styles.section3]}>
          <Row
            title='钱包'
            iconName='ios-photos'
            iconColor='#007ACC'
            handleClick={this._clickRow}
          />
          <View style={styles.division} />
          <Row
            title='卡包'
            iconName='ios-albums'
            iconColor='#7BDBC0'
            handleClick={this._clickRow}
          />
        </View>
        <View style={[styles.section, styles.section4]}>
          <Row
            title='表情'
            iconName='ios-happy'
            iconColor='#F5DE19'
            handleClick={this._clickRow}
          />
        </View>
        <View style={[styles.section, styles.section5]}>
          <Row
            title='设置'
            iconName='ios-settings'
            iconColor='#333333'
            handleClick={this._clickRow}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
  },
  division: {
    flex: 1,
    // height: 1,
    width: '90%',
    alignSelf: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  section1: {
    // padding: 10,
    // paddingLeft: 15,
    marginTop: 20,
  },
  touch: {
    // height: 50,
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 15,
  },
  avatar: {
    flex: 2,
  },
  userInfo: {
    flex: 6,
    justifyContent: 'center',
  },
  qrcodeIcon: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }

})

export default Me;
