import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { logOut } from '../../redux/actions/App'
import { connect } from "react-redux";

const mapDispatchToProps = {
  logOut,
}

const mapStateToProps = ({user}) => ({
  user: user.currentUser
})

class Home extends Component {

  state = { 
    currentUser: null 
  };

  componentDidMount() {
    const  currentUser  = this.props.user;
    this.setState({ currentUser: currentUser})
  }

  handleLogOut = () => {
    this.props.logOut();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.firstName}!
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
    backgroundColor: 'white',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
