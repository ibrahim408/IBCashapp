import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, Button, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import IconDos from "react-native-vector-icons/Feather";
import color from '../../config/colors'

class AcceptRequest extends Component {
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
            <Image style={{ width: 75, height: 75, flex: 1 }} resizeMode="contain" source={require('../../assets/images/logo.png')} />
        ),
        headerRight: (
            <TouchableOpacity style={{ backgroundColor: 'transparent', marginRight: 10 }}>
                <Icon
                    name="setting"
                    size={22}
                    color={color.grey}
                />
            </TouchableOpacity>
        )
    });
    state = {}
    handleAction = (id) => {
        let updateTransaction;

        // updateTransaction = this.props.transaction.find( id == id) 
        // type: request, result: decline
        // type: pay, reciever: sender, sender: reciever
        // this.props.updateTransaction(updateTransaction)
        // navigation.goback();
    }
    render() {
        const { navigation } = this.props;
        const from = navigation.getParam('from', 'NO-ID');
        const amount = navigation.getParam('amount', 'some default value');
        const id = navigation.getParam('id', 'no id');
        console.log(' the id is: ', id);

        return (
            <View style={styles.container}>
                <View style={{marginTop: 75}}>
                    <Text style={{alignSelf: 'center' , fontSize: 20, color: color.grey}}>request </Text>
                    <Text style={{alignSelf: 'center', fontSize: 20, color: color.grey}}>from  </Text>
                    <Text style={{alignSelf: 'center', fontSize: 25, color: color.grey}}>{from} </Text>
                </View>
                <View>
                    <Text style={{fontSize: 100, color: color.bluecard}}>${amount} </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={[styles.actionButton, styles.declineButton]}>
                        <Text style={{fontSize: 20, color: color.white}}>decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.acceptButton]}>
                        <Text style={{fontSize: 20, color: color.white}}>accept</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    actionButton: {
        marginBottom: 75,
        height: 50,
    },
    declineButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.redButton,
        marginLeft: 45,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    acceptButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 45,
        backgroundColor: color.green,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
    }
})
export default AcceptRequest;