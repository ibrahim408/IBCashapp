import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { addCard, updateCards, fetchCards } from '../../redux/actions/App'
import { connect } from "react-redux";

const mapDispatchToProps = {
    addCard,
    updateCards,
    fetchCards
}

const mapStateToProps = ({ card }) => ({
    cards: card.cards,
    activeCard: card.activeCard,
})

class Card extends Component {
    handleAddCard = () => {
        this.props.addCard();
    }
 
    handleUpdateCard = () => {
        this.props.updateCards();
    }
    
    handleFetchCards = () => {
        this.props.fetchCards();
    }

    componentDidMount(){
        console.log('cardyyyy ',this.props.cards)
    }

    componentDidUpdate(){
        console.log("cardssss", this.props.cards )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'grey' }}>
                <Button 
                    title="fetch users"
                    onPress={this.handleFetchCards}
                />
            </View>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Card);
