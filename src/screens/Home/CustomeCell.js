import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Text
} from 'react-native';
import { connect } from "react-redux";
import color from '../../config/colors'

let deviceWidth = Dimensions.get('window').width

const mapStateToProps = ({ user }) => ({
    user: user.currentUser,
})

class CustomeCell extends Component {

    state = {}

    renderAmount = (type, action, amount, senderEmail) => {
        if (type == "received")
            return <Text style={{ fontSize: 20, color: color.green }}>+ ${amount}</Text>
        else if (type == "pay" && senderEmail != this.props.user.email)
            return <Text style={{ fontSize: 20, color: color.green }}>+ ${amount}</Text>
        else if (type == "pay")
            return <Text style={{ fontSize: 20, color: color.moneysent }}>- ${amount}</Text>
        else if (type == "request" && action == "decline")
            return <Text style={{ fontSize: 20, color: color.grey, textDecorationLine: 'line-through' }}> ${amount}</Text>
        else if (type == "request" && senderEmail == this.props.user.email)
            return <Text style={{ fontSize: 20, color: color.grey }}>pending ${amount}</Text>
        else
            return <Text style={{ fontSize: 20, color: color.grey }}>accept ${amount}</Text>

    }

    render() {
        let avatarColor = this.props.color;
        let firstCharOfName = this.props.senderName.charAt(0).toUpperCase();
        let disabled = true;

        if (this.props.type == "request" && this.props.senderEmail != this.props.user.email)
            disabled = false;
        if (disabled == false && this.props.action == "decline")
            disabled = true

        return (
            <TouchableOpacity disabled={disabled} onPress={() => this.props.navigation.navigate('AcceptRequest', {
                from: this.props.senderName,
                senderEmail: this.props.senderEmail,
                recieverEmail: this.props.recieverEmail,
                amount: this.props.amount,
                id: this.props.id,
            })}>
                <View style={styles.container}>
                    <View style={styles.avatarContainer}>
                        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: color.white, fontSize: 16, fontWeight: 'bold' }}>{firstCharOfName}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.detailContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, color: color.black }}>{this.props.from}</Text>
                            <Text style={{ fontSize: 14, color: color.grey }}>{this.props.date.month}/{this.props.date.day}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <Text style={{ fontSize: 14, color: color.grey }}>{this.props.description}</Text>
                            {this.renderAmount(this.props.type, this.props.action, this.props.amount, this.props.senderEmail)}
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
        flexDirection: 'column'
    }
})

export default connect(mapStateToProps, null)(CustomeCell);


