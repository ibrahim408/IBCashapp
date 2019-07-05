import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import Loading from '../screens/Loading';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Card from '../screens/Card'
import AddCard from '../screens/AddCard'
import Send from '../screens/Send'
import AcceptRequest from '../screens/AcceptRequest'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Loading: {
      screen: Loading,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        header: null
      }
    },
    Card: {
      screen: Card
    },
    AddCard: {
      screen: AddCard
    },
    Send: {
      screen: Send
    },
    AcceptRequest: {
      screen: AcceptRequest
    }
  },
  {
    initialRouteName: "Loading"
  }
)

export default createAppContainer(AppNavigator);


