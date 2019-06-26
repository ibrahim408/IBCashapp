import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button } from 'react-native'
import Firebase from '../../Firebase';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null };
  }

  componentDidMount() {
    const { currentUser } = Firebase.auth()
    this.setState({ currentUser })
  }

  handleLogOut = () =>{
    Firebase.auth().signOut()
  }

  // handleLogOut = async () => {
  //   try {
  //     await Firebase.auth().signOut();
  //     this.props.navigation.navigate('Loading');
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        <Button
          title="log out"
          onPress={this.handleLogOut}
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
    backgroundColor: 'yellow',
  },
});

export default Home;