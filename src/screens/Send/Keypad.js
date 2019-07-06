import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import IconDos from "react-native-vector-icons/Entypo";
import color from '../../config/colors'
import { setAmount, setIsTenth } from '../../redux/actions/App'
import { connect } from "react-redux";


let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height


const mapDispatchToProps = {
    setAmount,
    setIsTenth
}
const mapStateToProps = ({ transactions }) => ({
    amount: transactions.amount,
    isTenth: transactions.isTenth
})

class Keypad extends Component {
    state = {
        transactionAmount: 0,
        isTenth: false,
        isHundredth: false
    }

    onPress0 = () => {
        const amount = this.props.amount
        let decimalPlace = (amount.toString().split('.')[1] || []).length;

        if (amount != 0 && decimalPlace < 2) {
            if (this.props.isTenth == false) {
                if (parseFloat(amount) % 1 == 0) {
                    if(typeof(amount)=='string')
                        this.props.setAmount(parseFloat(amount).toFixed(2))
                    else 
                        this.props.setAmount(parseFloat(amount.toString() + '0'))
                } else {
                    console.log('it does get callled');
                    this.props.setAmount(parseFloat(amount).toFixed(2))
                }
            } else {
                this.props.setAmount(amount.toFixed(1));
                this.props.setIsTenth(false)
            }

        }
    }

    onDigitPress = (number) => {
        let numberDecimal = number / 10;
        const amount = this.props.amount
        let decimalPlace = (amount.toString().split('.')[1] || []).length;

        if (amount == 0) {
            this.props.setAmount(number);
        } else if (decimalPlace < 2) {
            if (this.props.isTenth == false) {
                this.props.setAmount(parseFloat(amount + number.toString()));
            } else {
                this.props.setAmount(amount + numberDecimal);
                this.props.setIsTenth(false);
            }
        }
    }


    // onDigitPress = (number) => {
    //     let numberDecimal = number / 10;
    //     const amount = this.state.transactionAmount;
    //     let decimalPlace = (amount.toString().split('.')[1] || []).length;

    //     if (amount == 0) {
    //         // this.setState({ transactionAmount: number })
    //     } else if (decimalPlace < 2) {
    //         if (this.state.isTenth == false) {
    //             //this.setState({ transactionAmount: parseFloat(amount + number.toString()) })
    //         } else {
    //             // this.setState({
    //             //     transactionAmount: amount + numberDecimal,
    //             //     isTenth: false
    //             // })
    //         }
    //     }
    // }

    onPressDot = () => {
        if (this.props.isTenth == false && (this.props.amount % 1 == 0)) {
            this.props.setIsTenth(true);
        }
    }

    // bugggy
    onPressBackSpace = () => {
        // const amountString = this.state.transactionAmount;
        // var newAmountStr = amountString.toString().substr(0, amountString.toString().length-1);

        // console.log('old ', amountString);
        // console.log('new ', newAmountStr);

        // if((newAmountStr.toString().split('.')[1] || []).length == 1){
        //     this.setState({
        //         transactionAmount: parseFloat(newAmountStr),
        //         isTenth: true
        //     })
        // }else{
        //     this.setState({ 
        //         transactionAmount: parseFloat(newAmountStr)
        //     })
        // } 
    }

    render() {
        return (
            <View style={styles.keyPadContainer}>
                <View style={styles.keyPadColumn}>
                    <TouchableOpacity onPress={() => this.onDigitPress(1)}>
                        <Text style={styles.numberStyle}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onDigitPress(2)}>
                        <Text style={styles.numberStyle}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onDigitPress(3)}>
                        <Text style={styles.numberStyle}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.keyPadColumn}>
                    <TouchableOpacity onPress={() => this.onDigitPress(4)}>
                        <Text style={styles.numberStyle}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onDigitPress(5)}>
                        <Text style={styles.numberStyle}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onDigitPress(6)}>
                        <Text style={styles.numberStyle}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.keyPadColumn}>
                    <TouchableOpacity onPress={() => this.onDigitPress(7)}>
                        <Text style={styles.numberStyle}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onDigitPress(8)}>
                        <Text style={styles.numberStyle}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onDigitPress(9)}>
                        <Text style={styles.numberStyle}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.keyPadColumn}>
                    <TouchableOpacity onPress={this.onPressDot}>
                        <IconDos
                            name="dot-single"
                            size={20}
                            color={color.grey}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPress0}>
                        <Text style={styles.numberStyle}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPressBackSpace}>
                        <Icon
                            name="left"
                            size={20}
                            color={color.grey}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        marginLeft: deviceWidth / 25,
        marginRight: deviceWidth / 25,
    },
    numberStyle: {
        fontSize: 20,
        color: color.grey
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Keypad);
