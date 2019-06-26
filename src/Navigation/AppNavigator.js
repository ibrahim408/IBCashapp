import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import Loading from '../screens/Loading';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';


const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Loading: Loading,
    Login: Login,
    SignUp: SignUp,
  },
  {
    initialRouteName: "Loading"
  }
)

export default createAppContainer(AppNavigator);


