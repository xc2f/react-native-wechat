import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


import Row from './entryRow';
import FriendsCircle from './FriendsCircle';

class Compass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fresh: true,
    }

  }

  _onClick(Component) {

    // 为什么无效？
    if (Component === 'friendsCircle') {
      this.setState({
        fresh: false,
      });

      this.props.navigator.push({
        component: FriendsCircle,
      })
    }
  }


  render() {

    return (
      <View style={styles.container}>
        <View style={[styles.section, styles.section1]}>
          <Row
            fresh={this.state.fresh}
            title='朋友圈'
            iconName='ios-aperture-outline'
            iconColor='#4B32C3'
            handleClick={this._onClick.bind(this, 'friendsCircle')}
            />
        </View>
        <View style={[styles.section, styles.section2]}>
          <Row
            title='扫一扫'
            iconName='ios-qr-scanner'
            iconColor='#007ACC'
            handleClick={this._onClick.bind(this, '')}
          />
          <View
            style={styles.division}
          />
          <Row
            title='摇一摇'
            iconName='ios-bug-outline'
            iconColor='#007ACC'
            handleClick={this._onClick.bind(this, '')}
          />
        </View>
        <View style={[styles.section, styles.section3]}>
          <Row
            title='购物'
            iconName='ios-basket-outline'
            iconColor='red'
            handleClick={this._onClick.bind(this, '')}
          />
          <View
            style={styles.division}
          />
          <Row
            title='游戏'
            iconName='ios-game-controller-b-outline'
            iconColor='#007ACC'
            handleClick={this._onClick.bind(this, '')}
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
  section1: {
    marginTop: 20,
  },
  division: {
    flex: 1,
    // height: 1,
    width: '90%',
    alignSelf: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
  }

})

export default Compass;
