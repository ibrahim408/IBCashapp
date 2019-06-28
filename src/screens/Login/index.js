import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { logIn } from '../../redux/actions/App'
import { connect } from "react-redux";

const mapDispatchToProps = {
    logIn,
}

const mapStateToProps = ({ user }) => ({
    isAuthenticated: user.isAuthenticated,
    logInError: user.logInError
})


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
            <View style={styles.container}>
                <Text style={styles.title}>Log In</Text>
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
                        <View>
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
                                autoFocus
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
                            <Button
                                title="Submit"
                                onPress={props.handleSubmit}
                                color="black"
                                mode="contained"
                                loading={props.isSubmitting}
                                disabled={props.isSubmitting}
                            />
                            <Button
                                title="Don't have an account? Sign Up"
                                onPress={() => this.props.navigation.navigate('SignUp')}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
