import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet, Text, Picker, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { sendMoneyOrRequest } from '../../redux/actions/App'
import { connect } from "react-redux";
import { Formik } from 'formik';
import * as Yup from 'yup';

const mapDispatchToProps = {
    sendMoneyOrRequest
}

const mapStateToProps = (state) => ({
    user: state.user.currentUser,
});

const deviceWidth = Dimensions.get('window').width;

class SendTransaction extends Component {
    state = {
    }
    handleSendMoneyOrRequest = (transaction) => {
        if(transaction.type == ""){
            transaction.type = "send"
        }
        transaction.sender = this.props.user.email;
        console.log('will create this: ', transaction)
        this.props.sendMoneyOrRequest(transaction);
    }

    render() {
        return (
            <View style={styles.container}>
                <Formik
                    initialValues={{ reciever: '', amount: '', description: '', type: '' }}
                    validationSchema={Yup.object({
                        reciever: Yup.string()
                            .required('Required')
                            .email(),
                        amount: Yup.number()
                            .required('Required'),
                        description: Yup.string()
                            .required('Required')
                    })}
                    onSubmit={(values, formikActions) => {
                        setTimeout(() => {
                            this.handleSendMoneyOrRequest(values);
                            formikActions.setSubmitting(false);
                        }, 500);
                    }}>
                    {props => (
                        <View>
                            {this.state.logInErrorMessage &&
                                <Text style={{ color: 'red' }}>
                                    {this.state.logInErrorMessage}
                                </Text>
                            }
                            <TextInput
                                onChangeText={props.handleChange('reciever')}
                                onBlur={props.handleBlur('reciever')}
                                value={props.values.reciever}
                                placeholder="example@email.com"
                                style={styles.input}
                                autoFocus
                                autoCapitalize="none"
                                onSubmitEditing={() => {
                                    this.lastNameInput.focus()
                                }}
                            />
                            {props.touched.reciever && props.errors.reciever ? (
                                <Text style={styles.error}>{props.errors.reciever}</Text>
                            ) : null}
                            <TextInput
                                onChangeText={props.handleChange('amount')}
                                onBlur={props.handleBlur('amount')}
                                value={props.values.amount}
                                keyboardType='numeric'
                                placeholder="$$$"
                                style={styles.input}
                                autoCapitalize="none"
                                ref={el => this.lastNameInput = el}
                                onSubmitEditing={() => {
                                    this.emailInput.focus()
                                }}
                            />
                            {props.touched.amount && props.errors.amount ? (
                                <Text style={styles.error}>{props.errors.amount}</Text>
                            ) : null}
                            <TextInput
                                onChangeText={props.handleChange('description')}
                                onBlur={props.handleBlur('description')}
                                value={props.values.description}
                                placeholder="description"
                                style={styles.input}
                                autoCapitalize="none"
                                ref={el => this.lastNameInput = el}
                                onSubmitEditing={() => {
                                    this.emailInput.focus()
                                }}
                            />
                            {props.touched.description && props.errors.description ? (
                                <Text style={styles.error}>{props.errors.description}</Text>
                            ) : null}
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableWithoutFeedback onPress={() => props.handleChange('type')('send')}>
                                    <View style={[styles.buttonStyle, styles.centerEverything]} >
                                        <Text style={styles.buttonTextStyle}>Request</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => props.handleChange('type')('request')}>
                                    <View style={[styles.buttonStyle, styles.centerEverything]} >
                                        <Text style={styles.buttonTextStyle}>Request</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <Button
                                title="Submit"
                                onPress={props.handleSubmit}
                                color="black"
                                mode="contained"
                                loading={props.isSubmitting}
                                disabled={props.isSubmitting}
                            />
                        </View>
                    )}
                </Formik>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 200,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    title: {
        margin: 24,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    error: {
        margin: 8,
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        paddingHorizontal: 8,
        width: '100%',
        borderColor: '#ddd',
        borderWidth: 1,
        backgroundColor: '#fff',
    },
    loginScreenButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#1E6738',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    loginText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    centerEverything: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonGradientStyle: {
        height: 27,
        width: deviceWidth * 0.23,
        borderRadius: 5,
        marginLeft: 5
    },
    buttonStyle: {
        height: 33,
        width: 55,
        marginTop: 15,
        marginLeft: 20,
        borderRadius: 12,
        backgroundColor: 'green',
        justifyContent: 'center',
        borderRadius: 3,
    },
    buttonTextStyle: {
        fontSize: 14,
        color: 'white',
        backgroundColor: 'transparent',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SendTransaction);
