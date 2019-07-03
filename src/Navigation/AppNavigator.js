import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import Loading from '../screens/Loading';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Card from '../screens/Card'
import Transaction from '../screens/Transactions'
import SendTransaction from '../screens/SendTransaction'
import Send from '../screens/Send'
import Icon from "react-native-vector-icons/AntDesign";
import color from '../config/colors'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Loading: {
      screen: Loading,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        header: null
      }
    },
    Card: {
      screen: Card
    },
    Transaction: {
      screen: Transaction
    },
    SendTransaction: {
      screen: SendTransaction
    },
    Send: {
      screen: Send
    }
  },
  {
    initialRouteName: "Send"
  }
)

export default createAppContainer(AppNavigator);


