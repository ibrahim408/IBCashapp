import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from '../components/Home';
import Loading from '../components/Loading';
import Login from '../components/Login';
import SignUp from '../components/SignUp';


const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Loading: Loading,
    Login: Login,
    SignUp: SignUp,
  },
  {
    initialRouteName: "Loading"
  }
)

export default createAppContainer(AppNavigator);


