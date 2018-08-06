import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import MyIcon from './iconfont/MyIcon';
import Util from './util';


const ICON_TEXT_HEIGHT = Util.phoneHeight - 90;

const IconText = (props) => {
    let temp = props.iconText;
    let iconSize = 40;
    return (
        <View style={[styles.iconTextWrap,props.styleAni]}>
            <MyIcon name={temp.icon} size={iconSize} style={{color:temp.color}} />
            <Text style={styles.iconTextText}>{temp.text}</Text>
        </View>
    )
}


export default class MenuAnimation extends Component{
    constructor(){
        super();
        this.state = {
            inOutAnimated: new Animated.Value(-120),
            showMenu: false,
        }
    }

    _inAnimated = ()=>{
        Animated.timing(
            this.state.inOutAnimated,{
                toValue: 0,
                duration: 1000,
                delay:0,
                easing: Easing.elastic(1),
            },
        ).start();
        this.setState({showMenu:true});
    }
    _outAnimated = ()=>{
        Animated.timing(
            this.state.inOutAnimated,{
                toValue: -120,
                duration: 600,
                delay:0,
                easing: Easing.elastic(1),
            },
        ).start();
        this.setState({showMenu:false});
    }

    _iconDatas = [
        {
            icon: 'dayu',
            color: '#e4e4e4',
            text: 'Text'
        },
        {
            icon: 'dayu',
            color: '#e4e4e4',
            text: 'Text'
        },
        {
            icon: 'dayu',
            color: '#e4e4e4',
            text: 'Text'
        },
        {
            icon: 'dayu',
            color: '#e4e4e4',
            text: 'Text'
        },
        {
            icon: 'dayu',
            color: '#e4e4e4',
            text: 'Text'
        },
        {
            icon: 'dayu',
            color: '#e4e4e4',
            text: 'Text'
        },
    ]

    render() {
        return (
            <View style={{height:Util.phoneHeight,backgroundColor:'rgba(1,1,1,0.7)'}}>
                <View style={styles.iconTextBox}>
                    {
                        this._iconDatas.map((item, index) =>
                            <Animated.View style={
                                index % 2 === 0 ?
                                    {
                                        position: 'absolute',
                                        top: parseInt(index / 2) * (ICON_TEXT_HEIGHT / 3),
                                        left: this.state.inOutAnimated,
                                    } :
                                    {
                                        position: 'absolute',
                                        top: parseInt(index / 2) * (ICON_TEXT_HEIGHT / 3),
                                        right: this.state.inOutAnimated,
                                    }
                            }
                                key={() => 'iconText' + index}
                            >
                                <IconText iconText={item} />
                            </Animated.View>                    
                        )
                    }
                    </View>
                <Text onPress={this.state.showMenu ? ()=>this._outAnimated() : ()=>this._inAnimated()} 
                      style={styles.menuNeverMind}
                >
                    NeverMind
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    iconTextWrap: {
        width: Util.phoneWidth/2,
        height: ICON_TEXT_HEIGHT/3,   
        alignItems:"center",
        justifyContent:"center",
    },
    iconTextBox: {
        flexWrap: 'wrap',
        width: Util.phoneWidth,
        height: ICON_TEXT_HEIGHT,
    },
    menuNeverMind: {
        width: Util.phoneWidth,
        fontSize: 16,
        color: '#aaaaaa',
        textAlign: 'center',
    },
    iconTextText: {
        color: '#ffffff',
    }
})