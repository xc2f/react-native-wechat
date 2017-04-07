import React from 'react';
import { Navigator } from 'react-native';

import MainPage from './MainPage';

export default class App extends React.Component {
    render() {
        return (
          <Navigator
            initialRoute={{component: MainPage}}
            renderScene={(route, navigator) => {
              return (
                <route.component {...route.args} navigator={navigator} />
              )
            }}
          />
        )
    }
}
