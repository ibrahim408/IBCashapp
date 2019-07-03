import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import IconDos from "react-native-vector-icons/Feather";
import color from '../../config/colors'
import Keypad from './Keypad'

class index extends Component {
    static navigationOptions = {
        headerStyle: {
            borderBottomWidth: 0,
        },
        headerLeft: (
            <TouchableOpacity style={{ backgroundColor: 'transparent', marginLeft: 10 }}>
                <IconDos
                    name="bell"
                    size={22}
                    color={color.black}
                />
            </TouchableOpacity>
        ),
        headerTitle: (
            <Image style={{ width: 43, height: 43, flex: 1 }} resizeMode="contain" source={require('../../assets/images/logo.png')} />
        ),
        headerRight: (
            <TouchableOpacity style={{ backgroundColor: 'transparent', marginRight: 10 }}>
                <Icon
                    name="setting"
                    size={22}
                    color={color.black}
                />
            </TouchableOpacity>
        )
    };
    state = {}
    render() {
        return (
            <Keypad />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})
export default index;