import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { logIn } from '../../redux/actions/App'
import { connect } from "react-redux";
import color from '../../config/colors'

const mapDispatchToProps = {
    logIn,
}

const mapStateToProps = ({ user }) => ({
    isAuthenticated: user.isAuthenticated,
    logInError: user.logInError
})

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback style={{ flex: 1, backgroundColor: 'red' }}
        onPress={() => {
            console.log('dismissssss')
            Keyboard.dismiss()
        }}>
        {children}
    </TouchableWithoutFeedback>
)

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { logInErrorMessage: null };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isAuthenticated == false && this.props.isAuthenticated == true) {
            this.props.navigation.navigate('Main');
        } else if (prevProps.logInError != this.props.logInError) {
            this.setState({ logInErrorMessage: this.props.logInError })
        }
    }

    handleLogIn = (values) => {
        console.log('values :', values)
        this.props.logIn(values.email, values.password);
    }

    passwordInput = null;
    render() {
        return (
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid Email')
                        .required('Required'),
                    password: Yup.string()
                        .required('Required'),
                })}
                onSubmit={(values, formikActions) => {
                    setTimeout(() => {
                        this.handleLogIn(values);
                        //Alert.alert(JSON.stringify(values));
                        // Important: Make sure to setSubmitting to false so our loading indicator
                        // goes away.
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
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.grey }}>Login to continue</Text>
                        </View>

                        <View style={{ marginTop: 50 }}>
                            {this.state.logInErrorMessage &&
                                <Text style={{ color: 'red' }}>
                                    {this.state.logInErrorMessage}
                                </Text>
                            }
                            <TextInput
                                onChangeText={props.handleChange('email')}
                                onBlur={props.handleBlur('email')}
                                value={props.values.email}
                                placeholder="Email Address"
                                style={styles.input}
                                autoCapitalize="none"
                                onSubmitEditing={() => {
                                    // on certain forms, it is nice to move the user's focus
                                    // to the next input when they press enter.
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
                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>LOGIN</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: 20, marginTop: 20 }} onPress={() => this.props.navigation.navigate('SignUp')}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Text style={[styles.signUpText, { color: color.grey }]}>Don't have an account? </Text>
                                    <Text style={[styles.signUpText, { color: color.redButton }]}>Sign Up</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>

        );
    }
}

TouchableOpacity
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 120,
        paddingLeft: 50,
        backgroundColor: color.white
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
