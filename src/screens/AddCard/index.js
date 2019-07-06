import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, Button, FlatList } from 'react-native';
import { createCard, fetchCards } from '../../redux/actions/App'
import { connect } from "react-redux";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Valid from 'card-validator'

import Icon from "react-native-vector-icons/AntDesign";
import IconDos from "react-native-vector-icons/Feather";
import color from '../../config/colors'

let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width

const mapDispatchToProps = {
    createCard,
    fetchCards
}

class AddCard extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            borderBottomWidth: 0,
        },
        headerLeft: (
            <TouchableOpacity style={{ backgroundColor: 'transparent', marginLeft: 10 }}
                onPress={() => {
                    navigation.goBack()
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
        ),
        headerRight: (
            <TouchableOpacity style={{ backgroundColor: 'transparent', marginRight: 10 }}>
                <Icon
                    name="setting"
                    size={22}
                    color={color.grey}
                />
            </TouchableOpacity>
        )
    });

    // quick test to check if data is correct
    // cuz 6/2019 pass
    // add logic to handle different string format, specifically  number card
    handleCreateCard = (card) => {
        let willCreate = { ...card, active: false, type: 'Visa' }
        this.props.createCard(willCreate);
        this.props.fetchCards();
        this.props.navigation.goBack()
    }

    render() {
        return (
            <Formik
                initialValues={{ cardNumber: '', expMonth: '', expYear: '', cvv: '' }}
                validationSchema={Yup.object({
                    cardNumber: Yup.string()
                        .required('Required')
                        .test('test-card-number', 'invalid credit card number', value => Valid.number(value).isValid),
                    expMonth: Yup.string()
                        .required('Required')
                        .test('test-exp-month', 'invalid exp-month', value => Valid.expirationMonth(value).isValid),
                    expYear: Yup.string()
                        .required('Required')
                        .test('test-exp-year', 'invalid exp-year', value => Valid.expirationYear(value).isValid),
                    cvv: Yup.string()
                        .required('Required')
                        .test('test-cvv', 'invalid cvv', value => Valid.cvv(value).isValid),
                })}
                onSubmit={(values, formikActions) => {
                    setTimeout(() => {
                        this.handleCreateCard(values);
                        formikActions.setSubmitting(false);
                    }, 500);
                }}>
                {props => (
                    <View style={styles.container}>
                        <View style={{ marginTop: 65, marginLeft: deviceWidth / 15 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: color.grey }}>
                                Credit card detail
                    </Text>
                        </View>
                        <View style={styles.formContainer}>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    onChangeText={props.handleChange('cardNumber')}
                                    onBlur={props.handleBlur('cardNumber')}
                                    value={props.values.cardNumber}
                                    keyboardType='numeric'
                                    autoCapitalize="none"
                                    style={styles.input}
                                    placeholder="Card Number"
                                />
                                {props.touched.cardNumber && props.errors.cardNumber ? (
                                    <Text style={styles.error}>{props.errors.cardNumber}</Text>
                                ) : null}
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput
                                    onChangeText={props.handleChange('expMonth')}
                                    onBlur={props.handleBlur('expMonth')}
                                    value={props.values.expMonth}
                                    keyboardType='numeric'
                                    autoCapitalize="none"
                                    style={styles.input}
                                    placeholder="Month"
                                />
                                {props.touched.expMonth && props.errors.expMonth ? (
                                    <Text style={styles.error}>{props.errors.expMonth}</Text>
                                ) : null}
                                <TextInput
                                    onChangeText={props.handleChange('expYear')}
                                    onBlur={props.handleBlur('expYear')}
                                    value={props.values.expYear}
                                    keyboardType='numeric'
                                    autoCapitalize="none"
                                    style={[styles.input, { marginLeft: 10 }]}
                                    placeholder="Year"
                                />
                                {props.touched.expYear && props.errors.expYear ? (
                                    <Text style={styles.error}>{props.errors.expYear}</Text>
                                ) : null}
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput
                                    onChangeText={props.handleChange('cvv')}
                                    onBlur={props.handleBlur('cvv')}
                                    value={props.values.cvv}
                                    keyboardType='numeric'
                                    autoCapitalize="none"
                                    style={styles.input}
                                    placeholder="cvv"
                                />
                                {props.touched.cvv && props.errors.cvv ? (
                                    <Text style={styles.error}>{props.errors.cvv}</Text>
                                ) : null}
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, color: color.grey }}>3 or 4 digits usually found on the signature strip
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={props.handleSubmit} style={styles.createCardButtonStyle}>
                                    <Text style={{ color: color.white, fontSize: 20, fontWeight: 'bold' }}>Create Card
                            </Text>
                                </TouchableOpacity>
                            </View>
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
        backgroundColor: color.white
    },
    formContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 20,
        height: deviceHeight * .35,
        marginHorizontal: deviceWidth / 15,
    },
    input: {
        flex: 1,
        textAlignVertical: 'top',
        marginVertical: 10,
        borderRadius: 10,
        borderColor: color.grey,
        borderWidth: .2,
    },
    error: {
        margin: 8,
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
    },
    createCardButtonStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: color.green
    }
})

export default connect(null, mapDispatchToProps)(AddCard);
