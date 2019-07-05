import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
import { fetchTransactions } from '../../redux/actions/App'
import { connect } from "react-redux";
import CustomeCell from './CustomeCell'
import color from '../../config/colors'
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

const mapDispatchToProps = {
    fetchTransactions,
}

const mapStateToProps = ({ transactions }) => ({
    transactions: transactions.transactions,
})
class ActivitiesList extends Component {
    state = {}
    componentDidMount() {
        this.props.fetchTransactions()
    }
    render() {
        return (
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
                        data={this.props.transactions}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <CustomeCell
                            navigation={this.props.navigation}
                            avatar={item.avatar}
                            from={item.recieverName}
                            type={item.type}
                            description={item.description}
                            amount={item.amount}
                            id={item.id}
                            date3={Date(item.seconds)}
                            date={{
                                day: new Date(Date(item.seconds)).getDay(),
                                month: new Date(Date(item.seconds)).getMonth() + 1
                            }}
                        />}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesList);
