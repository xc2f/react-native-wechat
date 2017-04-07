import React, { Component } from 'react';
import { View, StatusBar, Platform, StyleSheet } from 'react-native';

class Statusbar extends Component {
  render() {
    return (
      <StatusBar
        animated={true}
        hidden={false}
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'light-content'}
        showHideTransition={'fade'}
        networkActivityIndicatorVisible={false}
        style={styles.statusbar}
      />
    );
  }
}

const styles = StyleSheet.create({
})

export default Statusbar;
