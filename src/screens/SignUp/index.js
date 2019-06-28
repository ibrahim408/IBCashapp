import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { signUp } from '../../redux/actions/App'
import { connect } from "react-redux";
import { Formik } from 'formik';
import * as Yup from 'yup';

const mapDispatchToProps = {
  signUp,
}

const mapStateToProps = ({ user }) => ({
  isAuthenticated: user.isAuthenticated,
  signUpError: user.signUpError
})

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
    }else if(prevProps.signUpError != this.props.signUpError){
      this.setState({logInErrorMessage: this.props.signUpError})
    }
  }

  handleSignUp = (values) => {
    console.log('values :', values)
    this.props.signUp(values.firstName,values.lastName,values.email, values.password);
  }

  lastNameInput = null;
  emailInput = null;
  passwordInput = null;
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.title}>Sign Up</Text>
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
                  <View>
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
                          autoFocus
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
                      <Button
                          title="Submit"
                          onPress={props.handleSubmit}
                          color="black"
                          mode="contained"
                          loading={props.isSubmitting}
                          disabled={props.isSubmitting}
                      />
                      <Button
                          title="Already have an account? Log In"
                          onPress={() => this.props.navigation.navigate('Login')}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

