import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { fetchTransactions, sendMoneyOrRequest, acceptRequest } from '../../redux/actions/App'
import { connect } from "react-redux";

const mapDispatchToProps = {
    fetchTransactions,
    sendMoneyOrRequest,
    acceptRequest
}

const mapStateToProps = (state) => ({
    transactions: state.transactions.transactions,
    isTransactionsFetched: state.transactions.isTransactionsFetched,
    user: state.user.currentUser
});

class Transactions extends Component {
    state = {}

    handleRequestMoneyOrRequest = (type) => {
        let transaction = {
            type: type,
            sender: this.props.user.email,
            reciever: 'max@gmail.com',
            amount: 50,
        }

        this.props.sendMoneyOrRequest(transaction);
    }

    handleAcceptRequest = () => {
        console.log('will accept this:', this.props.transactions[0]);
        this.props.acceptRequest(this.props.transactions[0]);
    }
    
    handleFetchTransactions = () => {
        this.props.fetchTransactions()
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Button
                    title="fetch transactions"
                    onPress={this.handleFetchTransactions}
                />
                <Button
                    title="send Money"
                    onPress={() => this.handleRequestMoneyOrRequest('send')}
                />
                <Button
                    title="request  Money"
                    onPress={() => this.handleRequestMoneyOrRequest('request')}
                />
                <Button
                    title="accept  Request"
                    onPress={() => this.handleAcceptRequest()}
                />
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
