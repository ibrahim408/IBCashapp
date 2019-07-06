import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, Image, Alert } from 'react-native'
import color from '../../config/colors'
import { fetchCards, logOut } from '../../redux/actions/App'
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Icon from "react-native-vector-icons/AntDesign";
import ActivitiesList from './ActivitiesList'
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

const mapDispatchToProps = {
  fetchCards,
  logOut,
}

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
  cards: state.card.cards,
  isCardFetched: state.card.isCardFetched,
})

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      borderBottomWidth: 0,
    },
    headerLeft: (
      <TouchableOpacity style={{ backgroundColor: 'transparent', marginLeft: 10 }}
        onPress={() => navigation.navigate('Card')}
      >
        <Icon
          name="creditcard"
          size={22}
          color={color.black}
        />
      </TouchableOpacity>
    ),
    headerTitle: (
      <Image style={{ width: 75, height: 75 }} resizeMode="contain" source={require('../../assets/images/logo.png')} />
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
  });

  state = {
    activeCard: '',
    last4Digits: '',
    expMonth: '',
    expYear: '',
    type: '',
    cardtopPosition: 0,
  };

  componentDidMount() {
    this.props.fetchCards();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isCardFetched != this.props.isCardFetched) {
      var active = this.props.cards.find((card) => {
        return card.active == true;
      })
      if (active) {
        this.setActiveCard(active);
      }
    }
  }

  setActiveCard(active) {
    let last4Digits = active.cardNumber.toString().substr(active.cardNumber.toString().length - 4);
    let expMonth = active.expMonth;
    let expYear;

    if (parseInt(active.expYear) > 2000)
      expYear = parseInt(active.expYear) - 2000;
    else
      expYear = parseInt(active.expYear);



    this.setState({
      activeCard: active,
      last4Digits: last4Digits,
      expMonth: expMonth,
      expYear: expYear,
      type: active.type
    })
  }

  handleLogOut = () => {
    this.props.logOut();
  }

  onLayoutEvent = (event) => {
    this.setState({ cardtopPosition: event.nativeEvent.layout.height / 4 });
  }

  fireAlert = () => {
    Alert.alert(
      '',
      'Set a default Card to use',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => this.props.navigation.navigate('Card') },
      ],
      { cancelable: false }
    )
  }

  render() {
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
                  <Text style={{ color: color.white, fontSize: 20 }}>****   ****   *****   ****    {this.state.last4Digits}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginLeft: 50 }}>
              <Text style={{ color: color.white, fontSize: 14 }}>Expiration Date
                </Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, marginRight: deviceWidth / 18 }}>
                <Text style={{ color: color.white, fontSize: 20 }}>{this.state.expMonth}/{this.state.expYear}
                </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.white }}>{this.state.type}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.balanceContaienr}>
            <View style={styles.balanceStyle}>
              <View style={{ marginLeft: deviceWidth / 18 }}>
                <Text style={{ fontSize: 12, color: color.grey }}>Account Balance
                </Text>
              </View>
              <View style={{ marginLeft: deviceWidth / 18 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: color.moneyreceived }}>${this.props.user.balance}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.transactionButtonContainer}>
            <TouchableOpacity style={styles.buttonStyle}
              onPress={() => {
                if (this.state.activeCard != "")
                  this.props.navigation.navigate("Send")
                else
                  this.fireAlert();
              }}>
              <Icon
                name="pluscircleo"
                size={20}
                color={color.white}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ActivitiesList disable={false} navigation={this.props.navigation} />
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export default compose(
//   connect(mapStateToProps, mapDispatchToProps),
//   firestoreConnect([
//    { collection: 'transactions'}
//   ])
//  )(Home)

