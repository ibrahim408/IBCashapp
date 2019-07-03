import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import IconDos from "react-native-vector-icons/Entypo";
import color from '../../config/colors'
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height
//Entypo dot-single
class Keypad extends Component {
    state = {
        transactionAmount: 0,
        isDecimal: false
    }

    onPress0 = () => {
        if(this.state.transactionAmount != 0){
            this.setState({transactionAmount : this.state.transactionAmount + '0'})
        }
    }

    onPress1 = () => {
        if(this.state.transactionAmount == 0){
            this.setState({transactionAmount : 1})
        }else{
            this.setState({transactionAmount : this.state.transactionAmount + '1'})
        }
    }

    onPress2 = () => {
        if(this.state.transactionAmount == 0){
            this.setState({transactionAmount : 2})
        }else{
            this.setState({transactionAmount : this.state.transactionAmount + '2'})
        }
    }

    onPress3 = () => {
        if(this.state.transactionAmount == 0){
            this.setState({transactionAmount : 3})
        }else{
            this.setState({transactionAmount : this.state.transactionAmount + '3'})
        }
    }

    onPress4 = () => {
        if(this.state.transactionAmount == 0){
            this.setState({transactionAmount : 4})
        }else{
            this.setState({transactionAmount : this.state.transactionAmount + '4'})
        }
    }

    onPress5 = () => {
        if(this.state.transactionAmount == 0){
            this.setState({transactionAmount : 5})
        }else{
            this.setState({transactionAmount : this.state.transactionAmount + '5'})
        }
    }

    onPress6 = () => {
        if(this.state.transactionAmount == 0){
            this.setState({transactionAmount : 6})
        }else{
            this.setState({transactionAmount : this.state.transactionAmount + '6'})
        }
    }

    onPress7 = () => {
        if(this.state.transactionAmount == 0){
            this.setState({transactionAmount : 7})
        }else{
            this.setState({transactionAmount : this.state.transactionAmount + '7'})
        }
    }

    onPress8 = () => {
        if(this.state.transactionAmount == 0){
            this.setState({transactionAmount : 8})
        }else{
            this.setState({transactionAmount : this.state.transactionAmount + '8'})
        }
    }

    onPress9 = () => {
        if(this.state.transactionAmount == 0){
            this.setState({transactionAmount : 9})
        }else{
            this.setState({transactionAmount : this.state.transactionAmount + '9'})
        }
    }

    onPressBackSpace = () => {
        //backSpace(this.props.tag);
    }

    onPressDot = () => {
        if(this.state.isDecimal == false){
            this.setState({isDecimal: true});
        }
        // if(this.state.transactionAmount != 0){
        //     this.setState({transactionAmount : this.state.transactionAmount + '9'})
        // }        
    }
    onPressHideKeyboard = () => {
        //hideKeyboard(this.props.tag);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.recieverInfoContainer}>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.transactionAmountStyle}>${this.state.transactionAmount}</Text>
                </View>
                <View style={styles.keyPadContainer}>
                    <View style={styles.keyPadColumn}>
                        <TouchableOpacity onPress={this.onPress1}>
                            <Text style={styles.numberStyle}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPress2}>
                            <Text style={styles.numberStyle}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPress3}>
                            <Text style={styles.numberStyle}>3</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyPadColumn}>
                        <TouchableOpacity onPress={this.onPress4}>
                            <Text style={styles.numberStyle}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPress5}>
                            <Text style={styles.numberStyle}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPress6}>
                            <Text style={styles.numberStyle}>6</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyPadColumn}>
                        <TouchableOpacity onPress={this.onPress7}>
                            <Text style={styles.numberStyle}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPress8}>
                            <Text style={styles.numberStyle}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPress9}>
                            <Text style={styles.numberStyle}>9</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyPadColumn}>
                        <TouchableOpacity>
                        <IconDos
                                name="dot-single"
                                size={20}
                                color={color.grey}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPress0}>
                            <Text style={styles.numberStyle}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon
                                name="left"
                                size={20}
                                color={color.grey}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.requestOrPayContainer}>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    recieverInfoContainer: {
        flex: 2,
    },
    amountContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    transactionAmountStyle: {
        fontSize: 100,
        color: color.bluecard
    },
    keyPadContainer: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    keyPadColumn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        marginLeft: deviceWidth / 15,
        marginRight: deviceWidth / 15,
    },
    numberStyle: {
        fontSize: 20,
        color: color.grey
    },
    requestOrPayContainer: {
        flex: 1,
    }
})

export default Keypad;