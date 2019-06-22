import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native'
import Firebase from '../../Firebase';

class Loading extends Component {

  constructor(props) {
    super(props);
    this.state = { check: false };
  }

  componentDidMount() {
    Firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'SignUp')
    })
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
    backgroundColor: 'pink',
  },
});

export default Loading;