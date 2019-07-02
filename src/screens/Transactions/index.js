import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { fetchCards, fetchTransactions, sendMoneyOrRequest, acceptRequest } from '../../redux/actions/App'
import { connect } from "react-redux";

const mapDispatchToProps = {
    fetchTransactions,
    sendMoneyOrRequest,
    acceptRequest,
    fetchCards,
}

const mapStateToProps = (state) => ({
    transactions: state.transactions.transactions,
    isTransactionsFetched: state.transactions.isTransactionsFetched,
    user: state.user.currentUser,
    isCardFetched: state.card.isCardFetched,
});

class Transactions extends Component {
    state = {
        activeCard: ''
    }
    
    componentDidMount(){
        this.props.fetchTransactions();
        this.props.fetchCards();
    }

    componentDidUpdate(prevProps){
        if (prevProps.isCardFetched != this.props.isCardFetched && this.props.cards !== undefined) {
            var active = this.props.cards.find((card) => {
                return card.active == true;
            })
            if(active){
                console.log('found active card');
                this.setState({activeCard: active})
            }
        } 
    }

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

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
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
