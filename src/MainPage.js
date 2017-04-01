import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, AsyncStorage } from 'react-native';

import NavigationBar from './components/NavigationBar';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from './components/Home';
import Contacts from './components/Contacts'
import Compass from './components/Home'
import Me from './components/Home'

import SearchPage from './components/SearchPage';


import Storage from 'react-native-storage';

var storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: null,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,
})
global.storage = storage;


export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelected: 'home'
    }
  }
  componentWillMount() {
    this.setState({
      homeNormal: <Icon name='ios-chatbubbles-outline' size={25} color='#8C8C8C' />,
      homeSelected: <Icon name='ios-chatbubbles' size={25} color='#09BB07' />,
      contactsNormal: <Icon name='ios-contacts-outline' size={25} color='#8C8C8C' />,
      contactsSelected: <Icon name='ios-contacts' size={25} color='#09BB07' />,
      compassNormal: <Icon name='ios-compass-outline' size={25} color='#8C8C8C' />,
      compasssSelected: <Icon name='ios-compass' size={25} color='#09BB07' />,
      meNormal: <Icon name='ios-contact-outline' size={25} color='#8C8C8C' />,
      meSelected: <Icon name='ios-contact' size={25} color='#09BB07' />
    })
  }
  _renderItem(Component, tab, tabName, normalIcon, selectedIcon) {
    const { navigator } = this.props;
    return (
      // renderIcon接受的必须是函数
      <TabNavigator.Item
        selected={this.state.tabSelected === tab}
        title={tabName}
        titleStyle={{ fontSize: 12, }}
        selectedTitleStyle={{color: '#09BB07', fontSize: 12,}}
        tabStyle={{paddingBottom: 5}}
        renderIcon={() => normalIcon}
        renderSelectedIcon={() => selectedIcon}
        onPress={ () => this.setState({
          tabSelected: tab
        })}
      >
      { <Component navigator={navigator} />}
      </TabNavigator.Item>
    )
  }

  _onSearchPress() {
    this.props.navigator.push({
      component: SearchPage,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <NavigationBar
            navigator={this.props.navigator}
            hasSearchWithAdd={true}
            handleSearchPress={this._onSearchPress.bind(this)}
          />
        </View>
        <View style={styles.body}>
          <TabNavigator
            hideTabTouch={true}
            tabBarStyle={{height: 57}}
          >
            {this._renderItem(Home, 'home', '首页', this.state.homeNormal, this.state.homeSelected)}
            {this._renderItem(Contacts, 'contacts', '通讯录', this.state.contactsNormal, this.state.contactsSelected)}
            {this._renderItem(Compass, 'compass', '发现', this.state.compassNormal, this.state.compasssSelected)}
            {this._renderItem(Me, 'me', '我', this.state.meNormal, this.state.meSelected)}
          </TabNavigator>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    flex: 1,
    backgroundColor: '#313436',
  },
  body: {
    flex: 11,
  }
})
