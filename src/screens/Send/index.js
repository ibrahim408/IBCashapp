import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image, Dimensions, TextInput, Button } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import IconDos from "react-native-vector-icons/Feather";
import color from '../../config/colors'
import Keypad from './Keypad'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from "react-redux";
import { fetchCards, fetchTransactions, sendMoneyOrRequest, setIsTenth, setAmount } from '../../redux/actions/App'

const mapDispatchToProps = {
    fetchCards,
    fetchTransactions,
    sendMoneyOrRequest,
    setAmount,
    setIsTenth
}

const mapStateToProps = (state) => ({
    user: state.user.currentUser,
    isCardFetched: state.card.isCardFetched,
    amount: state.transactions.amount,
})

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

class index extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            borderBottomWidth: 0,
        },
        headerLeft: (
            <TouchableOpacity style={{ backgroundColor: 'transparent', marginLeft: 10 }}
                onPress={() => {
                    navigation.goBack()
                    navigation.state.params.setAmount(0);
                    navigation.state.params.setIsTenth(false);
                }}
            >
                <IconDos
                    name="arrow-left"
                    size={22}
                    color={color.grey}
                />
            </TouchableOpacity>
        ),
        headerTitle: (
            <Image style={{ width: 75, height: 75, flex: 1 }} resizeMode="contain" source={require('../../assets/images/logo.png')} />
        )
    });

    state = {}

    componentDidMount() {
        this.props.fetchCards();
        this.props.navigation.setParams({
            setAmount: this.actionSetAmount,
            setIsTenth: this.actionSetIsTenth
        });
    }
    componentWillUnmount() {
        this.props.setAmount(0);
        this.props.setIsTenth(false);
    }

    actionSetAmount = (amount) => {
        this.props.setAmount(amount);
    };

    actionSetIsTenth = (boolean) => {
        this.props.setIsTenth(boolean);
    };

     handleSubmitTransaction = async (values) => {
        if (this.props.amount != 0) {
            let transaction = {
                ...values,
                senderEmail: this.props.user.email,
                senderName: this.props.user.firstName + " " + this.props.user.lastName,
                amount: this.props.amount,
                date: new Date(),
                action: 'pending',
            }
            await this.props.sendMoneyOrRequest(transaction);
            this.props.fetchTransactions();
            this.props.navigation.goBack()
        }
    }

    render() {
        const { bindSubmitForm } = this.props;
        return (
                <Formik
                    initialValues={{ recieverEmail: '', description: '', type: '' }}
                    validationSchema={Yup.object({
                        recieverEmail: Yup.string()
                            .email('Invalid Email')
                            .required('Required'),
                        description: Yup.string(),
                        type: Yup.string(),
                    })}
                    onSubmit={(values, formikActions) => {
                        setTimeout(() => {
                            this.handleSubmitTransaction(values);
                            //Alert.alert(JSON.stringify(values));
                            // Important: Make sure to setSubmitting to false so our loading indicator
                            // goes away.
                            formikActions.setSubmitting(false);
                        }, 500);
                    }}>
                    {props => (
                        <View style={styles.container}>
                            <View style={styles.recieverInfoContainer}>
                                <View>
                                    <TextInput
                                        onChangeText={props.handleChange('recieverEmail')}
                                        onBlur={props.handleBlur('recieverEmail')}
                                        value={props.values.recieverEmail}
                                        placeholder="Email Address"
                                        style={styles.input}
                                        autoFocus
                                        autoCapitalize="none"
                                    />
                                    {props.touched.recieverEmail && props.errors.recieverEmail ? (
                                        <Text style={styles.error}>{props.errors.recieverEmail}</Text>
                                    ) : null}
                                    <TextInput
                                        onChangeText={props.handleChange('description')}
                                        onBlur={props.handleBlur('description')}
                                        value={props.values.description}
                                        placeholder="payment for"
                                        autoCapitalize="none"
                                        style={styles.input}
                                    />
                                </View>
                            </View>
                            <View style={styles.amountContainer}>
                                <Text style={styles.transactionAmountStyle}>${this.props.amount}</Text>
                            </View>
                            <Keypad />
                            <View style={styles.requestOrPayContainer}>
                                <TouchableOpacity style={styles.payButton} onPress={async () => {
                                    await props.setFieldValue('type', 'pay');
                                    props.handleSubmit();
                                }} >
                                    <Text style={{ fontSize: 18, color: color.white }}>Pay</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.requestButton} onPress={async () => {
                                    await props.setFieldValue('type', 'request');
                                    props.handleSubmit();
                                }} >
                                    <Text style={{ fontSize: 18, color: color.white }}>Request</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    recieverInfoContainer: {
        flex: 2,
        justifyContent: 'flex-end',
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
    requestOrPayContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    error: {
        margin: 8,
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: .25,
        marginHorizontal: 20
    },
    requestButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 25,
        marginRight: 25,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: color.grey,
        borderLeftWidth: .5,
        borderBottomColor: 'black',
    },
    payButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 25,
        marginLeft: 25,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        backgroundColor: color.grey
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(index);




