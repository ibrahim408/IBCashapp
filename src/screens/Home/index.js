import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native'
import color from '../../config/colors'
import { logOut } from '../../redux/actions/App'
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import IconDos from "react-native-vector-icons/Feather";
import activities from './activities'
import CustomeCell from './CustomeCell'
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

const mapDispatchToProps = {
  logOut,
}

const mapStateToProps = ({ user }) => ({
  user: user.currentUser
})

class Home extends Component {
  static navigationOptions = {
    headerStyle: {
      borderBottomWidth: 0,
    },
    headerLeft: (
      <TouchableOpacity style={{ backgroundColor: 'transparent', marginLeft: 10 }}>
        <IconDos
          name="bell"
          size={22}
          color={color.black}
        />
      </TouchableOpacity>
    ),
    headerTitle: (
      <Image style={{ width: 75, height: 75, flex: 1 }} resizeMode="contain" source={require('../../assets/images/logo.png')} />
    ),
    headerRight: (
      <TouchableOpacity style={{ backgroundColor: 'transparent', marginRight: 10 }}>
        <Icon
          name="setting"
          size={22}
          color={color.black}
        />
      </TouchableOpacity>
    )
  };

  state = {
    cardtopPosition: 0,
  };

  componentDidMount() {
    console.log(activities);
    const currentUser = this.props.user;
    this.setState({ currentUser: currentUser })
  }

  handleLogOut = () => {
    this.props.logOut();
  }

  onLayoutEvent = (event) => {
    console.log("top: ", event.nativeEvent.layout.height);
    this.setState({ cardtopPosition: event.nativeEvent.layout.height / 4 });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={{ flex: 3, backgroundColor: 'white' }} onLayout={this.onLayoutEvent}>
          </View>
          <View style={{ flex: 1, backgroundColor: color.tanbackGround }}>
          </View>
          <View style={[styles.cardContainer, { top: this.state.cardtopPosition }]}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginLeft: 50 }}>
                <Text style={{ color: color.white, fontSize: 14 }}>Card Number
                </Text>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: color.white, fontSize: 20 }}>****   ****   *****   ****    9066
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginLeft: 50 }}>
              <Text style={{ color: color.white, fontSize: 14 }}>Expiration Date
                </Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, marginRight: deviceWidth / 18 }}>
                <Text style={{ color: color.white, fontSize: 20 }}>12/26
                </Text>
                <Text style={{ color: color.white }}>VISA
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.balanceContaienr}>
            <View style={styles.balanceStyle}>
              <View style={{ marginLeft:  deviceWidth / 18}}>
                <Text  style={{fontSize: 12, color: color.grey}}>Account Balance
                </Text>
              </View>
              <View style={{ marginLeft:  deviceWidth / 18}}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: color.moneyreceived}}>$359.54
                </Text>
              </View>              
            </View>
          </View>
          <View style={styles.transactionButtonContainer}>
            <TouchableOpacity style={styles.buttonStyle}>
              <Icon
                name="pluscircleo"
                size={20}
                color={color.white}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 10, }}>
            <View style={{ marginTop: 5, marginLeft: 10 }}>
              <Text style={{ fontSize: 20 }}>Activity</Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <TouchableOpacity style={styles.activityButtonStyle}>
                <Text style={[{ fontSize: 10, color: color.activityButtonTextColor }]}>see all
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 5 }}>
            <FlatList
              data={activities}
              renderItem={({ item }) => <CustomeCell
                avatar={item.avatar}
                from={item.from}
                type={item.type}
                description={item.description}
                date={item.date}
                amount={item.amount}
              />}
            />
          </View>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    flex: 7,
    backgroundColor: 'white',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: color.bluecard,
    right: 0,
    width: (deviceWidth / 1.1),
    height: deviceHeight / 4.5,
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    elevation: 1000,
    zIndex: 1000
  },
  middleContainer: {
    flex: 3,
    flexDirection: 'row',
    backgroundColor: color.tanbackGround,
  },
  balanceContaienr: {
    flex: 68,
  },
  balanceStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //marginRight: deviceWidth/30,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: color.white
  },
  transactionButtonContainer: {
    flex: 32,
  },
  buttonStyle: {
    flex: 1,
    borderRadius: 35,
    marginRight: deviceWidth / 20,
    marginLeft: deviceWidth / 20,
    backgroundColor: color.redButton,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 11,
    backgroundColor: color.tanbackGround,
  },
  activityButtonStyle: {
    height: 20,
    width: 50,
    marginRight: deviceWidth / 20,
    backgroundColor:
      color.activityButtonColor,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);



