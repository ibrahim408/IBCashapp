import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, ActivityIndicator} from 'react-native'

class Loading extends Component {
   
  constructor(props) {
      super(props);
      this.state = { check: false };
    }

    render() {
      return (
        <View style={styles.container}>
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