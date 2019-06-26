import React, { Component } from 'react';
import IBCashApp from './src/IBCashApp';
import {Provider} from 'react-redux'
import store from './src/redux/store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <IBCashApp />
      </Provider>
    )
  }
}