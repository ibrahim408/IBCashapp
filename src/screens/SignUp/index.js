import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { signUp } from '../../redux/actions/App'
import { connect } from "react-redux";
import { Formik } from 'formik';
import * as Yup from 'yup';
import color from '../../config/colors'

const mapDispatchToProps = {
    signUp,
}

const mapStateToProps = ({ user }) => ({
    isAuthenticated: user.isAuthenticated,
    signUpError: user.signUpError
})

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logInErrorMessage: null
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.isAuthenticated == false && this.props.isAuthenticated == true) {
            this.props.navigation.navigate('Main');
        } else if (prevProps.signUpError != this.props.signUpError) {
            this.setState({ logInErrorMessage: this.props.signUpError })
        }
    }

    handleSignUp = (values) => {
        console.log('values :', values)
        this.props.signUp(values.firstName, values.lastName, values.email, values.password);
    }

    lastNameInput = null;
    emailInput = null;
    passwordInput = null;
    render() {
        return (
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                    validationSchema={Yup.object({
                        firstName: Yup.string()
                            .required('Required'),
                        lastName: Yup.string()
                            .required('Required'),
                        email: Yup.string()
                            .email('Invalid Email')
                            .required('Required'),
                        password: Yup.string()
                            .required('Required'),
                    })}
                    onSubmit={(values, formikActions) => {
                        setTimeout(() => {
                            this.handleSignUp(values);
                            formikActions.setSubmitting(false);
                        }, 500);
                    }}>
                    {props => (
                        <View style={styles.container}>
                            <Image style={{ width: 150, height: 150, marginRight: 50, alignSelf: 'center' }} resizeMode="contain" source={require('../../assets/images/logo.png')} />
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.black }}>Welcome</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.grey }}>Sign up to continue</Text>
                            </View>

                            <View style={{ marginTop: 50 }}>
                                {this.state.logInErrorMessage &&
                                    <Text style={{ color: 'red' }}>
                                        {this.state.logInErrorMessage}
                                    </Text>
                                }
                                <TextInput
                                    onChangeText={props.handleChange('firstName')}
                                    onBlur={props.handleBlur('firstName')}
                                    value={props.values.firstName}
                                    placeholder="first name"
                                    style={styles.input}
                                    autoCapitalize="none"
                                    onSubmitEditing={() => {
                                        this.lastNameInput.focus()
                                    }}
                                />
                                {props.touched.firstName && props.errors.firstName ? (
                                    <Text style={styles.error}>{props.errors.firstName}</Text>
                                ) : null}
                                <TextInput
                                    onChangeText={props.handleChange('lastName')}
                                    onBlur={props.handleBlur('lastName')}
                                    value={props.values.lastName}
                                    placeholder="last name"
                                    style={styles.input}
                                    autoCapitalize="none"
                                    ref={el => this.lastNameInput = el}
                                    onSubmitEditing={() => {
                                        this.emailInput.focus()
                                    }}
                                />
                                {props.touched.lastName && props.errors.lastName ? (
                                    <Text style={styles.error}>{props.errors.lastName}</Text>
                                ) : null}
                                <TextInput
                                    onChangeText={props.handleChange('email')}
                                    onBlur={props.handleBlur('email')}
                                    value={props.values.email}
                                    placeholder="Email Address"
                                    style={styles.input}
                                    autoCapitalize="none"
                                    ref={el => this.emailInput = el}
                                    onSubmitEditing={() => {
                                        this.passwordInput.focus()
                                    }}
                                />
                                {props.touched.email && props.errors.email ? (
                                    <Text style={styles.error}>{props.errors.email}</Text>
                                ) : null}
                                <TextInput
                                    onChangeText={props.handleChange('password')}
                                    onBlur={props.handleBlur('password')}
                                    value={props.values.password}
                                    placeholder="Your Password"
                                    autoCapitalize="none"
                                    secureTextEntry
                                    style={styles.input}
                                    ref={el => this.passwordInput = el}
                                />
                                {props.touched.password && props.errors.password ? (
                                    <Text style={styles.error}>{props.errors.password}</Text>
                                ) : null}
                                <TouchableOpacity
                                    style={styles.logInButton}
                                    onPress={props.handleSubmit}
                                    loading={props.isSubmitting}
                                    disabled={props.isSubmitting}
                                >
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>SIGN UP</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 20, marginTop: 20 }} onPress={() => this.props.navigation.navigate('Login')}>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Text style={[styles.signUpText, { color: color.grey }]}>Already have an account? </Text>
                                        <Text style={[styles.signUpText, { color: color.green }]}>Login</Text>
                                    </View>
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
        paddingTop: 80,
        paddingLeft: 50,
        backgroundColor: color.white
    },
    error: {
        marginTop: 8,
        marginLeft: 8,
        fontSize: 12,
        color: color.redButton,
    },
    input: {
        height: 50,
        paddingHorizontal: 8,
        width: '100%',
        borderColor: '#ddd',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    logInButton: {
        marginTop: 50,
        borderRadius: 8,
        width: '50%',
        height: 45,
        backgroundColor: color.lightGrey
    },
    signUpText: {
        fontSize: 12,
        fontWeight: 'bold',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

