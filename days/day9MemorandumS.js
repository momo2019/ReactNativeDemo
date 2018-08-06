import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, LayoutAnimation, Platform, UIManager } from 'react-native';
import Memorandum from './day8Memorandum';
import Util from './util';



export default class MemorandumS extends Component{
    constructor(){
        super();
        this.state = {
            showAll: false,
            showIndex: 0,
        }
    }
    _cards = [
        {
            title: 'dev',
            color: '#ff0000',
            data: [
                {
                    selected: false,
                    content: 'aa'
                },{
                    selected: false,
                    content: 'aa'
                },{
                    selected: false,
                    content: 'aa'
                }
            ]
        },{
            title: 'dev',
            color: '#ff0000',
            data: [
                {
                    selected: false,
                    content: 'aa'
                },{
                    selected: false,
                    content: 'aa'
                },{
                    selected: false,
                    content: 'aa'
                }
            ]
        },{
            title: 'dev',
            color: '#ff0000',
            data: [
                {
                    selected: false,
                    content: 'aa'
                },{
                    selected: false,
                    content: 'aa'
                },{
                    selected: false,
                    content: 'aa'
                }
            ]
        },{
            title: 'dev',
            color: '#ff0000',
            data: [
                {
                    selected: false,
                    content: 'aa'
                },{
                    selected: false,
                    content: 'aa'
                },{
                    selected: false,
                    content: 'aa'
                }
            ]
        },{
            title: 'dev',
            color: '#ff0000',
            data: [
                {
                    selected: false,
                    content: 'aa'
                },{
                    selected: false,
                    content: 'aa'
                },{
                    selected: false,
                    content: 'aa'
                }
            ]
        },{
            title: 'dev',
            color: '#ff0000',
            data: [
                {
                    selected: false,
                    content: 'aa'
                },{
                    selected: false,
                    content: 'aa'
                },{
                    selected: false,
                    content: 'aa'
                }
            ]
        },
    ]
    _animations = {
        duration: 100,
        create: {
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.opacity
        },
        update: {
          type: LayoutAnimation.Types.linear,
          springDamping: 0.5,
        },
      };
    _showCards = ()=>{
        LayoutAnimation.configureNext(this._animations);
        this.setState({
            showAll: true,
        })
    }
    _showThisCard = (index)=>{
        LayoutAnimation.configureNext(this._animations);
        this.setState({
            showAll: false,
            showIndex: index
        })
    }
     componentWillMount(){
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
     }

    render(){
        let cards = this._cards.map((item, index, array) =>
            <TouchableHighlight
                onPress={()=>this._showThisCard(index)}
                key={'memo-item' + index}
                style={[styles.card,
                      {
                          top: this.state.showAll ? 55*index : (index === this.state.showIndex? 0 : Util.phoneHeight - 80 + (60 / array.length) * index) 
                      }]}
                ref={'card' + index}
            >
                <Memorandum switch={() => this._showThisCard(index)} itemData={item} />
            </TouchableHighlight>
        )
        return (
            <View style={styles.cardsWrap}>
                {cards}
                <TouchableHighlight 
                    underlayColor='transparent'
                    onPress={() => this._showCards()}
                    style={styles.bottomPress}
                >
                    <View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardsWrap: {
        height: Util.phoneHeight,
        width: Util.phoneWidth,
        backgroundColor: '#000000',
    },
    card: {
        position: 'absolute',
        height: Util.phoneHeight - 100,
        width: Util.phoneWidth,
        left: 0,
        borderColor: '#e4c3a2',
        borderWidth: 1,
        borderRadius: 15,
        overflow: 'hidden'
    },
    bottomPress: {
        position: 'absolute',
        height: 100,
        width: Util.phoneWidth,
        left: 0,
        bottom: 0,
    }
})