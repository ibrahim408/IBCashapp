import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text, Image } from 'react-native';
import color from '../../config/colors'

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height
class CustomeCell extends Component {
    state = {}
    renderAmount = (type, amount) => {
        if (type == "received")
            return <Text style={{ fontSize: 20, color: color.green }}>+ ${amount}</Text>
        else if (type == "pay")
            return <Text style={{ fontSize: 20, color: color.moneysent }}>- ${amount}</Text>
        else
            return <Text style={{ fontSize: 20, color: color.grey }}> ${amount}</Text>

    }
    // {this.props.type == "received" ? (
    //     <Text style={{ fontSize: 20, color: color.green }}>+ ${this.props.amount}</Text>
    // ) : <Text style={{ fontSize: 20, color: color.moneysent }}>- ${this.props.amount}</Text>
    // }
    render() {
        let disabled = true;
        if (this.props.type == "request")
            disabled = false;

        return (
            <TouchableOpacity disabled={disabled} onPress={() => this.props.navigation.navigate('AcceptRequest', {
                from: this.props.from,
                amount: this.props.amount,
                id: this.props.id,
            })}>
                <View style={styles.container}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: this.props.avatar }} style={styles.avatar} />
                    </View>
                    <View style={styles.detailContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, color: color.black }}>{this.props.from}</Text>
                            <Text style={{ fontSize: 14, color: color.grey }}>{this.props.date.month}/{this.props.date.day}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <Text style={{ fontSize: 14, color: color.grey }}>{this.props.description}</Text>
                            {this.renderAmount(this.props.type, this.props.amount)}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 80,
        borderBottomColor: color.grey,
        borderBottomWidth: .5,
        marginRight: deviceWidth / 20,
        marginLeft: deviceWidth / 20,
    },
    avatarContainer: {
        flex: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        height: 36,
        width: 36,
        borderRadius: 18
    },
    detailContainer: {
        flex: 85,
        justifyContent: 'center',
        //alignItems: 'center',        
        flexDirection: 'column'
    }
})
export default CustomeCell;

