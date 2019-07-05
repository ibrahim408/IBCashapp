import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native';
import { createCard, updateCards, fetchCards } from '../../redux/actions/App'
import { connect } from "react-redux";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Valid from 'card-validator'


const mapDispatchToProps = {
    createCard,
    updateCards,
    fetchCards
}

const mapStateToProps = ({ card }) => ({
    cards: card.cards,
    isCardFetched: card.isCardFetched,
})

class Card extends Component {
    state = {
        activeCard: ''
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isCardFetched != this.props.isCardFetched) {
            var active = this.props.cards.find((card) => {
                return card.active == true;
            })
            if (active) {
                console.log('found active card');
                this.setState({ activeCard: active })
            }
        }
    }

    handleCreateCard = (card) => {
        console.log("will create: ", card)
        // quick test to check if data is correct
        // cuz 6/2019 pass
        // add logic to handle different string format, specifically  number card

        this.props.createCard(card);
    }

    handleUpdateCard = () => {
        let updateCard = { ...this.props.cards[0], name: "ricky" };
        console.log('card 1', updateCard);
        this.props.updateCards(updateCard);
    }

    handleFetchCards = () => {
        this.props.fetchCards();
    }

    render() {
        return (
            <View style={styles.container}>

                <Formik
                    initialValues={{ cardNumber: '', expMonth: '', expYear: '', cvv: '', postalCode: '' }}
                    validationSchema={Yup.object({
                        cardNumber: Yup.string()
                        .required('Required')
                        .test('test-card-number','invalid credit card number', value => Valid.number(value).isValid),
                        expMonth: Yup.string()
                        .required('Required')
                        .test('test-exp-month','invalid exp-month',value => Valid.expirationMonth(value).isValid),
                        expYear: Yup.string()
                        .required('Required')
                        .test('test-exp-year','invalid exp-year',value => Valid.expirationYear(value).isValid),                        
                        cvv: Yup.string()
                        .required('Required')
                        .test('test-cvv','invalid cvv', value => Valid.cvv(value).isValid),
                        postalCode: Yup.string()
                        .required('Required')
                        .test('test-postalCode','invalid postal code', value => Valid.postalCode(value).isValid),
                    })}
                    onSubmit={(values, formikActions) => {
                        setTimeout(() => {
                            this.handleCreateCard(values);
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
                                onChangeText={props.handleChange('cardNumber')}
                                onBlur={props.handleBlur('cardNumber')}
                                value={props.values.cardNumber}
                                placeholder="credit card number"
                                keyboardType='numeric'
                                style={styles.input}
                                autoFocus
                                autoCapitalize="none"
                                onSubmitEditing={() => {
                                    this.lastNameInput.focus()
                                }}
                            />
                            {props.touched.cardNumber && props.errors.cardNumber ? (
                                <Text style={styles.error}>{props.errors.cardNumber}</Text>
                            ) : null}
                            <TextInput
                                onChangeText={props.handleChange('expMonth')}
                                onBlur={props.handleBlur('expMonth')}
                                value={props.values.expMonth}
                                placeholder="month / year"
                                keyboardType='numeric'
                                style={styles.input}
                                autoCapitalize="none"
                                ref={el => this.lastNameInput = el}
                                onSubmitEditing={() => {
                                    this.emailInput.focus()
                                }}
                            />
                            {props.touched.expMonth && props.errors.expMonth ? (
                                <Text style={styles.error}>{props.errors.expMonth}</Text>
                            ) : null}
                            <TextInput
                                onChangeText={props.handleChange('expYear')}
                                onBlur={props.handleBlur('expYear')}
                                value={props.values.expYear}
                                placeholder="year"
                                keyboardType='numeric'
                                style={styles.input}
                                autoCapitalize="none"
                                ref={el => this.lastNameInput = el}
                                onSubmitEditing={() => {
                                    this.emailInput.focus()
                                }}
                            />
                            {props.touched.expYear && props.errors.expYear ? (
                                <Text style={styles.error}>{props.errors.expYear}</Text>
                            ) : null}                            
                            <TextInput
                                onChangeText={props.handleChange('cvv')}
                                onBlur={props.handleBlur('cvv')}
                                value={props.values.cvv}
                                placeholder="cvv"
                                keyboardType='numeric'
                                autoCapitalize="none"
                                style={styles.input}
                                ref={el => this.passwordInput = el}
                            />
                            {props.touched.cvv && props.errors.cvv ? (
                                <Text style={styles.error}>{props.errors.cvv}</Text>
                            ) : null}
                            <TextInput
                                onChangeText={props.handleChange('postalCode')}
                                onBlur={props.handleBlur('postalCode')}
                                value={props.values.postalCode}
                                placeholder="postal code"
                                autoCapitalize="none"
                                keyboardType='numeric'
                                style={styles.input}
                                ref={el => this.passwordInput = el}
                            />
                            {props.touched.postalCode && props.errors.postalCode ? (
                                <Text style={styles.error}>{props.errors.postalCode}</Text>
                            ) : null}                            
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
  });
  

export default connect(mapStateToProps, mapDispatchToProps)(Card);
