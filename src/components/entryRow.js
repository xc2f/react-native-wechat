import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class EntryRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 如果从这里取fresh，值改变后不会刷新ui
      // fresh:  this.props.fresh || false,
      freshImg: '',
    }
  }

  componentWillMount() {
    storage.load({
      key: 'userData'
    })
    .then( res => {
      this.setState({
        freshImg: res.data[0].avatar
      })
    })
    .catch( err => {
      console.log('Several error occured: ' + err.message );
    })
    .done()
  }

  render() {
    const { iconName, iconColor, title, message } = this.props;
    const { freshImg } = this.state;

    // 只能通过props取父组件属性重绘ui
    const { fresh } = this.props || false;
    return (
      <TouchableHighlight
        onPress={this.props.handleClick}
        underlayColor='#ddd'
        style={styles.touch}
      >
        <View style={styles.rowConatiner}>
          <View style={styles.sectionL}>
            <Icon name={iconName} size={25} color={iconColor} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.sectionR}>
            { fresh ?
              (
                <View style={styles.message}>
                  <Image
                    source={{
                      uri: freshImg
                    }}
                    style={styles.messageImg}
                  />
                  <View
                    style={styles.redDot}
                  />
                </View>
              )
            :
              (
                <View />
              )
            }
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  touch: {
    height: 45,
    // borderColor: 'red',
    // borderWidth: 1,
    // flex: 1,
  },
  rowConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionL: {
    flex: 5,
    paddingLeft: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    color: '#222',
    paddingLeft: 17,
  },
  message: {
    marginRight: 20,
  },
  messageImg: {
    width: 20,
    height: 20,
  },
  redDot: {
    width: 7,
    height: 7,
    backgroundColor: 'red',
    borderRadius: 10,
    position: 'absolute',
    right: -3,
    top: -3
  }
})

