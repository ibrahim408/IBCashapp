import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, Button, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import IconDos from "react-native-vector-icons/Feather";
import color from '../../config/colors'
import { fetchCards,updateCard } from '../../redux/actions/App'
import { connect } from "react-redux";

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

const mapDispatchToProps = {
    fetchCards,
    updateCard
}

const mapStateToProps = (state) => ({
    user: state.user.currentUser,
    cards: state.card.cards,
    isCardFetched: state.card.isCardFetched,
})

class Card extends Component {
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
        )
    });

    state = {
        activeCard: '',
    };
    componentDidMount() {
        this.props.fetchCards();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isCardFetched != this.props.isCardFetched) {
            var activeCard = this.props.cards.find((card) => {
                return card.active == true;
            })
            if (activeCard) {
                this.setState({ activeCard });
            }
        }
    }
    handlePressMakeDefault = (newActiveCard) => {
        if(this.state.activeCard != ''){
            let resetOldActiveCard = {...this.state.activeCard, active: false}
            this.props.updateCard(resetOldActiveCard);
        }
        let setNewActiveCard = {...newActiveCard, active: true}
        this.props.updateCard(setNewActiveCard);
        this.props.fetchCards();
    }
    renderCards = (item, index) => {
        let lastIndex = this.props.cards.length - 1;
        let cardNumber = item.cardNumber;
        let last4Digits = cardNumber.toString().substr(cardNumber.toString().length - 4);
        if (item.id == this.state.activeCard.id) {
            return this.renderActiveCard('staro',last4Digits)
        } else {
            return this.renderNoActiveCard('star',last4Digits,item)
        }
    }

    renderActiveCard = (iconLabel,last4Digits) => {
        return (
            <View style={styles.listColumnContainer}>
                <View style={styles.creditCardContainer}>
                    <View style={styles.iconContainer}>
                        <Icon
                            name={iconLabel}
                            size={14}
                            color={color.black}
                        />
                    </View>
                </View>
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 18 }}>{last4Digits}
                    </Text>
                </View>
            </View>
        )
    }
    renderNoActiveCard = (iconLabel,last4Digits,item) => {
        return (
            <View style={[styles.listColumnContainer, { justifyContent: 'space-between' }]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.creditCardContainer}>
                        <View style={styles.iconContainer}>
                            <Icon
                                name={iconLabel}
                                size={14}
                                color={color.black}
                            />
                        </View>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 18 }}>{last4Digits}
                </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.handlePressMakeDefault(item)}>
                    <View style={{}}>
                        <Text style={{ color: color.grey }}>Make default</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }


    renderAddCard = () => {
        return (
            <View style={styles.addCardInnerContainer}>
                <View style={styles.creditCardContainer}>
                    <View style={styles.iconContainer}>
                        <Icon
                            name='plus'
                            size={14}
                            color={color.black}
                        />
                    </View>
                </View>
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 18 }}>Add Credit Card
                    </Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cardLabel}>
                    <Text style={{ color: color.grey, fontSize: 16 }}>cards
                    </Text>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={this.props.cards}
                        extraData={this.state.activeCard}
                        renderItem={({ item, index }) => this.renderCards(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false}
                    />
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCard')}>
                    <View style={styles.addCardContainer}>
                        {this.renderAddCard()}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },
    cardLabel: {
        marginTop: 50,
        marginLeft: 20,
        marginBottom: 10
    },
    listContainer: {
        backgroundColor: color.tanbackGround
    },
    listColumnContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 55,
        borderBottomWidth: .25,
        borderBottomColor: color.grey,
        marginHorizontal: deviceWidth / 20,
    },
    creditCardContainer: {
        height: 25,
        width: 38,
        borderRadius: 3,
        borderColor: color.black,
        borderWidth: .2,
        backgroundColor: color.white
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addCardContainer: {
        height: 55,
        backgroundColor: color.tanbackGround
    },
    addCardInnerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: deviceWidth / 20,
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Card);
