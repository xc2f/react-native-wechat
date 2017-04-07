import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { hasBack, navTitle, subTitle, messageCount, hasSearchWithAdd, hasUserIcon } = this.props;

    // 左边是否有返回
    let leftSection = null;
    if (hasBack) {
      leftSection = (
        <View style={styles.navTitle}>
          <View style={styles.navBack}>
            <TouchableHighlight
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={this.props.handleBackPress}
            >
              <Icon name='md-arrow-round-back' size={25} color='white' />
            </TouchableHighlight>
          </View>
          <View style={styles.division}></View>
          <View style={styles.subTitle}>
            <Text style={styles.subTitleText}>{subTitle}</Text>
          </View>
        </View>
      )

    } else {
      leftSection = (
        <View style={styles.navTitle}>
          {messageCount
            ?
            <Text style={styles.navText}>Wc({messageCount})</Text>
            :
            <Text style={styles.navText}>Wc</Text>
          }
        </View>
      )
    }

    // 右边是否是搜索和加号组合
    let rightSection = null;
    if (hasSearchWithAdd) {
      rightSection = (
        <View style={styles.searchWithAdd}>
          <View style={styles.navIconWrap}>
            <TouchableHighlight
              style={styles.navIcon}
              onPress={this.props.handleSearchPress}
              underlayColor='#000'
            >
              <Icon name='ios-search' size={25} color='white' />
            </TouchableHighlight>
          </View>
          <View style={[styles.navIconWrap]}>
            <TouchableHighlight
              style={styles.navIcon}
              underlayColor='#000'
            >
              <Icon name='md-add' size={27} color='white' />
            </TouchableHighlight>
          </View>
        </View>
      )
    } else if (hasUserIcon) {
        rightSection = (
          <View style={styles.userIcon}>
            <Icon name='ios-person' size={33} color='white' />
          </View>
        )
    }


    return (
      <View style={styles.container}>
        <View style={styles.navLeft}>
          {leftSection}
        </View>
        <View style={styles.navRight}>
          {rightSection}
        </View>

        {/*end view container*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#313436',
  },
  navLeft: {
    flex: 2,
    justifyContent: 'center',
    // paddingLeft: 15,
  },
  navRight: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 15,
  },
  navText: {
    color: 'white',
    fontSize: 22,
    paddingLeft: 15,
  },
  searchWithAdd: {
    flexDirection: 'row',
  },
  navIconWrap: {
    flex: 1,
  },
  navIcon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  navBack: {
    alignItems: 'center',
    flex: 5,
  },
  division: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#222',
    height: 25
  },
  subTitle: {
    flex: 15,
    paddingLeft: 5,
  },
  subTitleText: {
    fontSize: 20,
    color: 'white'
  },
  userIcon: {
    alignItems: 'flex-end'
  }
})
