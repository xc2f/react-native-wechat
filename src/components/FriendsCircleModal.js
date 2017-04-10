import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, Image, Modal, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';


class FriendsCircle extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={styles.container}>

        {/*modal*/}
        <Modal
          animationType='fade'
          transparent={true}
          visible={this.props.visible}
          onRequestClose={()=>{
            '你有什么用';
            {/*this.setState({
              modalVisible: false,
            })*/}
          }}
          style={styles.modal}
        >
          <View style={styles.modalWrap}>

            <View
              style={styles.modalShade}
            >
              <TouchableWithoutFeedback
                onPress={this.props.hiddenModal}
              >
                <View
                  style={styles.shadeTouch}
                />
              </TouchableWithoutFeedback>
            </View>


            <TouchableHighlight
              underlayColor='#ddd'
              style={styles.modalTouch}
              onPress={this.props.changeBanner}
            >
              <View>
                <Text
                  style={styles.modalText}
                >更换相册封面</Text>
              </View>
            </TouchableHighlight>

            <View
              style={styles.modalShade}
            >
              <TouchableWithoutFeedback
                onPress={this.props.hiddenModal}
              >
                <View
                  style={styles.shadeTouch}
                />
              </TouchableWithoutFeedback>
            </View>

          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    // backgroundColor: 'red',
  },

  modalWrap: {
    backgroundColor: 'rgba(0, 0, 0, .4)',
    // justifyContent: 'center',
    // alignSelf: 'center',
    // height: 30,
    // top: '50%',
    // flexDirection: 'row',
    // width: '50%',
    flex: 1,
    alignItems: 'center',
  },
  modalShade: {
    width: '100%',
    flex: 10,
  },
  shadeTouch: {
    width: '100%',
    height: '100%',
  },
  modalTouch: {
    backgroundColor: '#fff',
    width: '50%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  modalText: {
    // color: '#fff',
  }
})

export default FriendsCircle;
