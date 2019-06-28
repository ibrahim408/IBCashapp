import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { createCard, updateCards, fetchCards } from '../../redux/actions/App'
import { connect } from "react-redux";

const mapDispatchToProps = {
    createCard,
    updateCards,
    fetchCards
}

const mapStateToProps = ({ card }) => ({
    cards: card.cards,
    isFetched: card.isFetched,
})

class Card extends Component {
    state = {
        activeCard: ''
    }

    handleCreateCard = () => {
        let card = {
            addressZip: parseInt('435'),
            cardNumber: parseInt('00000333322221111'),
            cvc: parseInt('3433'),
            expMonth: parseInt('09'),
            expYear: parseInt('2021'),
            active: false,
            name: "obama"            
        }
        this.props.createCard(card);
    }
 
    handleUpdateCard = () => {
        let updateCard = {...this.props.cards[0], name: "ricky"};
        console.log('card 1',updateCard);
        this.props.updateCards(updateCard);
    }
    
    handleFetchCards = () => {
        this.props.fetchCards();
    }
    
    componentDidUpdate(prevProps){
        if (prevProps.isFetched != this.props.isFetched) {
            var active = this.props.cards.find((card) => {
                return card.active == true;
            })
            if(active){
                console.log('found active card');
                this.setState({activeCard: active})
            }
        } 
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Button 
                    title="fetch card"
                    onPress={this.handleFetchCards}
                />
                <Button
                title="create card"
                onPress={this.handleCreateCard}
                />
                <Button
                title="update card"
                onPress={this.handleUpdateCard}
                />                
            </View>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Card);
