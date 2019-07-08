import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import IconDos from "react-native-vector-icons/Feather";
import color from '../../config/colors'
import ActivitiesList from './ActivitiesList'

class FullList extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerLeft: (
            <TouchableOpacity style={{ backgroundColor: 'transparent', marginLeft: 10 }}
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <IconDos
                    name="arrow-left"
                    size={22}
                    color={color.grey}
                />
            </TouchableOpacity>
        ),
        headerTitle: (
          <Image style={{ width: 75, height: 75 }} resizeMode="contain" source={require('../../assets/images/logo.png')} />
        )
      });
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <ActivitiesList disable={true} navigation={this.props.navigation} />
            </View>
        );
    }
}

export default FullList;