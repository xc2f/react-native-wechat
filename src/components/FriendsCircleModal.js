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

            {/*上部空白*/}
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

            {
              this.props.elements.map((item, idx) => {

                return (
                  <View
                    style={styles.modalTouch}
                    key={idx}
                  >
                    <TouchableHighlight
                      underlayColor='#ddd'
                      onPress={item.handle.bind(null, idx)}
                      style={styles.touchContent}
                    >
                      <View>
                        <Text
                          style={styles.modalText}
                        >{item.title}</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                )
              })
            }

            {/*下部空白*/}
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
    flex: 7,
  },
  shadeTouch: {
    width: '100%',
    height: '100%',
  },
  modalTouch: {
    backgroundColor: '#fff',
    width: '70%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  touchContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    // color: '#fff',
  }
})

export default FriendsCircle;
