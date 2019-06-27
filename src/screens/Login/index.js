import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
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
    this.state = { email: '', password: '', errorMessage: null };
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated == false && this.props.isAuthenticated == true) {
      this.props.navigation.navigate('Main');
    }else if(prevProps.logInError != this.props.logInError){
      this.setState({errorMessage: this.props.logInError})
    }
  }

  handleLogin = () => {
    const { email, password } = this.state
    this.props.logIn(email, password);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
