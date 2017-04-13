import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableHighlight, Platform, ListView, Keyboard } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import NavigationBar from './NavigationBar';
import Statusbar from './StatusBar';

import ChatContent from './ChatContent';

import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voiceInput: false,
      faceShow: false,
      moreFuncShow: false,
      voiceTextStatus: '按住 说话'
    }
    this._onVoiceChange = this._onVoiceChange.bind(this);
    this._onVoicePress = this._onVoicePress.bind(this);
    this._onFaceShow = this._onFaceShow.bind(this);
  }

  _onBackPress() {
    this.props.navigator.pop();
  }

  _onVoiceChange() {
    this.setState({
      voiceInput: !this.state.voiceInput,
      faceShow: false,
    })
  }

  _onVoicePress() {
    this.setState({
      voiceTextStatus: '松开 结束'
    })
  }

  _onFaceShow() {
      this.setState({
        faceShow: !this.state.faceShow,
        voiceInput: false,
      })
  }





  render() {
    const { data } = this.props;

    return (
        <View style={styles.container}>
          <Statusbar />
          <View style={styles.nav}>
            <NavigationBar
              hasBack={true}
              hasUserIcon={true}
              subTitle={data.userName}
              handleBackPress={this._onBackPress.bind(this)}
            />
          </View>

          <View style={styles.main}>

              <View style={styles.body}>
                {/*<ScrollView>*/}
                    <ChatContent />
                {/*</ScrollView>*/}
              </View>
              <View style={styles.inputArea}>
                <View style={styles.inputSourcesIcon}>
                  <TouchableHighlight
                    onPress={this._onVoiceChange}
                    underlayColor='transparent'
                  >
                    { this.state.voiceInput ?
                      ( <Icon name='ios-keypad' size={30} color='gray' /> )
                    :
                      ( <Icon name='ios-mic' size={30} color='gray' /> )
                    }
                  </TouchableHighlight>
                </View>
                <View style={styles.inputSources}>
                  {/*<TouchableHighlight>*/}
                    { this.state.voiceInput ?
                      ( <TouchableHighlight
                          underlayColor='#eee'
                          onLongPress={this._onVoicePress}
                          style={styles.inputSourcesTouch}
                        >
                          <Text style={styles.inputSourcesText}>{this.state.voiceTextStatus}</Text>
                        </TouchableHighlight> )
                    :
                      (
                        <TextInput
                          underlineColorAndroid='green'
                          style={{
                            flex: 1,
                            width: '100%',
                          }}
                        />
                       )
                    }
                  {/*</TouchableHighlight>*/}
                </View>
                <View style={styles.faceIcon}>
                  <TouchableHighlight
                    onPress={this._onFaceShow}
                    underlayColor='transparent'
                  >
                    { this.state.faceShow ?
                      ( <Icon name='ios-keypad' size={30} color='gray' />)
                    :
                      ( <Icon name='ios-happy-outline' size={30} color='gray' />)
                    }
                  </TouchableHighlight>
                </View>
                <View style={styles.moreIcon}>
                  <TouchableHighlight>
                    <Icon name='md-add' size={30} color='gray' />
                  </TouchableHighlight>
                </View>
              </View>
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
    // flex: 1,
    height: 70,
    paddingTop: Platform.OS === 'ios' ? 20 : 17,
    backgroundColor: '#313436',
  },
  main: {
    flex: 11,
  },
  body: {
    flex: 20,
    backgroundColor: '#eee',
  },
  inputArea: {
    // flex: 2,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputSourcesIcon: {
    flex: 2,
    alignItems: 'center',
  },
  inputSources: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputSourcesTouch: {
    width: '90%',
    // height: '90%',
    borderWidth: 1,
    borderColor: '#eee',
    flex: 1,
    margin: 5,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputSourcesText: {
    // borderWidth: 1,
    // borderColor: '#eee',
  },
  faceIcon: {
    flex: 2,
    alignItems: 'center',
  },
  moreIcon: {
    flex: 2,
    alignItems: 'center',
  },
})
