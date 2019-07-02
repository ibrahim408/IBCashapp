import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import Loading from '../screens/Loading';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Card from '../screens/Card'
import Transaction from '../screens/Transactions'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }  
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
    Transaction: {
      screen: Transaction
    }
  },
  {
    initialRouteName: "Loading"
  }
)

export default createAppContainer(AppNavigator);


