import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// import NavigationBar from './NavigationBar

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this._onBackPress = this._onBackPress.bind(this);
  }

  _onBackPress() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.searchBar}>
            <View style={styles.back}>
              <TouchableOpacity
                underlayColor='#000'
                onPress={this._onBackPress}
              >
                <Icon name='md-arrow-round-back' size={25} color='white' />
              </TouchableOpacity>
            </View>
            {/*<View style={styles.divide}></View>*/}
            <View style={styles.input}>
              <View style={styles.searchIcon}>
                <Icon name='ios-search' size={25} color='white' />
              </View>
              <View style={styles.inputArea}>
                <TextInput
                  autoFocus={true}
                  style={styles.inputElement}
                  placeholder='搜索'
                  placeholderTextColor='#777'
                />
              </View>
              <View style={styles.micIcon}>
                <Icon name='md-mic' size={25} color='white' />
              </View>
            </View>
          </View>
          <View style={styles.body}></View>

        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#313436',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  back: {
    flex: 1,
    justifyContent: 'center',
  },
  // divide: {
  //   flex: 1,
  // },
  input: {
    flex: 8,
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderBottomColor: 'green',
    // marginBottom: 5,
    // marginRight: 5,
  },
  searchIcon: {
    flex: 1,
    justifyContent: 'center',
  },
  inputArea: {
    flex: 8,
  },
  inputElement: {
  },
  // inputElement: {
  //   padding: 0,
  // },
  micIcon: {
    flex: 1,
    justifyContent: 'center',
  },
  body: {
    flex: 11,
  }

})
