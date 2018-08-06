import React, { Component } from 'react';
import { View, Text, StyleSheet, PanResponder, LayoutAnimation, Platform, UIManager } from 'react-native';
import Util from './util';
import MyIcon from './iconfont/MyIcon';

const CARD_SIZE = Util.phoneWidth / 3;

const CardItem = (props) => {
    return (
        <View style={styles.sortableCardItemWrap}>
            <MyIcon name={props.icon}
                    style={[styles.sortableCardItemIcon,
                            {color: props.color}
                          ]}
            
            />
            <Text>{props.itemIndex}</Text>
        </View>
    )
}


export default class DragSortable extends Component{

    constructor(){
        super();
        this.state = {
            lastestIndex: 0,
            cardItems: [
                {
                    key: 0,
                    icon:'dayu',
                    color:'#e40000',
                },{
                    key: 1,
                    icon:'qing',
                    color:'#e40000',
                },{
                    key: 2,
                    icon:'duoyun',
                    color:'#e40000',
                },{
                    key: 3,
                    icon:'leidian',
                    color:'#e40000',
                },{
                    key: 4,
                    icon:'yintian',
                    color:'#e40000',
                },{
                    key: 5,
                    icon:'xue',
                    color:'#e40000',
                },
            ]
        }
    }

    _prevLeft = 0;
    _prevTop = 0;
    _nowIndex = -1;
    _animations = {
        duration: 200,
        create: {
            type: LayoutAnimation.Types.linear,
            property: LayoutAnimation.Properties.opacity
        },
        update: {
            type: LayoutAnimation.Types.linear,
            springDamping: 0.7,
        },
    };

    _cardItemsStart = (evt, gestureState)=>{
        const {pageX, pageY} = evt.nativeEvent;
        this._nowIndex = Math.floor(pageX / CARD_SIZE) + Math.floor(pageY / CARD_SIZE)*3;
        this._prevLeft = Math.floor(pageX / CARD_SIZE)*CARD_SIZE;
        this._prevTop = Math.floor(pageY / CARD_SIZE)*CARD_SIZE;
    }
    _cardItemsMove = (evt, gestureState)=>{
        let nowLeft = this._prevLeft + gestureState.dx;
        let nowTop = this._prevTop + gestureState.dy;
        let maxLeftIndex = (this.state.cardItems.length-1)%3;
        let maxTopIndex = Math.floor((this.state.cardItems.length-1)/3);
        let nowLeftIndex = Math.floor( (nowLeft+CARD_SIZE/2) / CARD_SIZE);
        let nowTopIndex =  Math.floor( (nowTop+CARD_SIZE/2) / CARD_SIZE);
        let nowIndex;
        let catchItem = this.refs['cardItem'+this._nowIndex];
        let cardItems = this.state.cardItems;

        if(nowTopIndex >= maxTopIndex){
            nowTopIndex = maxTopIndex;
            if(maxLeftIndex !== 0 && nowLeftIndex > maxLeftIndex){
                nowLeftIndex = maxLeftIndex;
            }
        }else{
            if(nowLeftIndex >= 3){
                nowLeftIndex = 2;
            }
        }
        nowIndex = nowLeftIndex + nowTopIndex*3;
        LayoutAnimation.configureNext(this._animations);

        if(this._nowIndex !== nowIndex){
            cardItems.splice(nowIndex,0,...(cardItems.splice(this._nowIndex,1)))
            this.setState({
                cardItems,
                lastestIndex: nowIndex
            });
            catchItem.setNativeProps({
                style: {
                    left: (this._nowIndex%3) * CARD_SIZE,
                    top: parseInt(this._nowIndex/3) * CARD_SIZE,
                }
            });
            this._nowIndex = nowIndex;
        }else{
            catchItem.setNativeProps({
                style: {
                    left: nowLeft,
                    top: nowTop
                }
            })
        }
    }
    _endMove = (evt, gestureState)=>{
        let catchItem = this.refs['cardItem'+this._nowIndex];
        if(!!!catchItem){
            return;
        }
        catchItem.setNativeProps({
            style: {
                left: (this._nowIndex%3) * CARD_SIZE,
                top: parseInt(this._nowIndex/3) * CARD_SIZE,
            }
        })
    }

    componentWillMount(){
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dy / gestureState.dx != 0,
            onPanResponderGrant: (evt, gestureState) => this._cardItemsStart(evt, gestureState),
            onPanResponderMove: (evt, gestureState) => this._cardItemsMove(evt, gestureState),
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => this._endMove(evt, gestureState),
            onPanResponderTerminate: (evt, gestureState) => this._endMove(evt, gestureState),
            onShouldBlockNativeResponder: (event, gestureState) => true,
        })
    }

    render() {
        const cards = this.state.cardItems.map((item, index) => {
            return <View key={() => 'cardItem' + item.key}
                ref={'cardItem' + index}
                style={{
                    position: 'absolute',
                    left: CARD_SIZE * (index % 3),
                    top: CARD_SIZE * parseInt(index / 3),
                }}
                {...this._panResponder.panHandlers}
            >
                <CardItem icon={item.icon}
                    color={item.color}
                    itemIndex={'天气' + index}
                />
            </View>
        })
        cards.push(cards.splice(this.state.lastestIndex,1))

        return (
            <View style={styles.sortableWrap}>
                {cards}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sortableWrap:{
    },
    sortableCardItemIcon: {
        fontSize: 40,
    },
    sortableCardItemWrap: {
        width: CARD_SIZE,
        height: CARD_SIZE,
        borderWidth: 1,
        backgroundColor: '#e2e2e2',
        alignItems: 'center',
        justifyContent: 'center',
    }
})