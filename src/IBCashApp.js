import React, { Component } from 'react'
import { View } from 'react-native';
import {createAppContainer } from 'react-navigation';
import AppNavigator from './navigation/AppNavigator'
import { connect } from "react-redux";


class IBCashApp extends Component {
    render() {
        return (
            <AppNavigator />
        );
    }
}

export default IBCashApp;