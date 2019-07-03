import React, { Component } from 'react'
import {StyleSheet, View, ActivityIndicator } from 'react-native'
import Firebase from '../../Firebase';
import { fetchUserDetails } from '../../redux/actions/App'
import { connect } from "react-redux";

const mapDispatchToProps = {
  fetchUserDetails,
}

const mapStateToProps = ({user}) => ({
  user: user.currentUser
})

class Loading extends Component {

  componentDidMount() {
    try {
      Firebase.auth().onAuthStateChanged(user => {
        if(user){
          this.props.fetchUserDetails(user.uid);
        }else{
          this.props.navigation.navigate('Home');
          //this.props.navigation.navigate('SignUp');
        }
      })
    } catch (e) {
      console.log('error: ', e)
    }

  }
  componentDidUpdate(prevProps){
    if(prevProps.user !== this.props.user){
      this.props.navigation.navigate("Home");
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
    backgroundColor: 'white',
  },
});

export default connect(mapStateToProps,mapDispatchToProps)(Loading);
