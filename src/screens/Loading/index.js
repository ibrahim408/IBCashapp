import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native'
import Firebase from '../../Firebase';

class Loading extends Component {

  constructor(props) {
    super(props);
    this.state = { check: false };
  }

  componentDidMount() {
    try {
      Firebase.auth().onAuthStateChanged(user => {
        console.log(user);
        this.props.navigation.navigate(user ? 'Home' : 'SignUp')
      })
    } catch (e) {
      console.log('error: ', e)
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default Loading;