import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';

import ChatPage from '../components/ChatPage';
import ListViewForHome from './ListViewForHome';


// const FETCH_URL = 'http://192.168.0.104:8080/WeChat/findall/find.spring';
// const FETCH_URL = 'http://localhost:17685/index.html';
const FETCH_URL = 'http://192.168.0.102:3000';

// var myHeaders = new Headers({
//   'Content-Type': 'text/html'
// });


// var myInit = { method: 'GET',
//                headers: myHeaders,
//                cache: 'default' };

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      dataReceived: false
    };
    this._rowClick = this._rowClick.bind(this);
  }

  componentWillMount() {
    this._fetchData();
  }

  _fetchData() {
    fetch(FETCH_URL)
      .then( (res) => {
        return res.json()
      })
      .then( resJson => {

        this.setState({
          data: resJson,
          dataReceived: true
        })

        // save storage
        storage.save({
          key: 'userData',
          rawData: {
            data: resJson
          }
        })

      }
      )
      .catch( err => {
        console.warn(err)
      })
      .done()
  }

  _rowClick(data) {
    this.props.navigator.push({
      component: ChatPage,
      args: {
        data: data,
      }
    })
  }


  render() {
    const { data, dataReceived } = this.state;

    if (data && dataReceived) {
      return (
        <View style={styles.listContainer}>
          <ListViewForHome
            data={data}
            handleRowClick={this._rowClick}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.listContainer}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 30,
              fontWeight: 'bold',
              paddingTop: 30,
            }}
          >Loading...</Text>
        </View>
      )
    }


    /*return (
      <View style={styles.listContainer}>
        {dataReceived
          ?
          (
            <ListViewForHome
              data={data}
              handleRowClick={this._rowClick}
            />
          )
          :
          (
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 30,
              fontWeight: 'bold',
              paddingTop: 30,
            }}
          >Loading...</Text>
          )
        }
      </View>
    )*/

  }
}

const styles = StyleSheet.create({
  listContainer: {
    // paddingBottom: 7,
  },
})
