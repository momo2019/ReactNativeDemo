import React,{Component} from 'react';
import {View, Easing, Animated, StyleSheet} from 'react-native';
import MyIcon from './iconfont/MyIcon';
import Util from './util';
import HomePageTest from './homePage';

const AnimatedIcon = Animated.createAnimatedComponent(MyIcon);

class EntranceAnimation extends Component{
    constructor(){
        super();
        this.state={
            transformAni: new Animated.Value(1),
            opacityAni: new Animated.Value(1)
        }
    }
    componentDidMount(){
        Animated.timing(
            this.state.transformAni,{
                toValue: 8,
                duration: 1200,
                delay:1200,
                easing: Easing.elastic(2),
            },
        ).start();
        Animated.timing(         
            this.state.opacityAni,{
                toValue: 0,
                duration: 800,
                easing: Easing.elastic(1),
                delay:1400,
            },          
        ).start();

        setTimeout(()=>{
            this.props.handleAnimatedEnd();
        },2500);
    }

    render(){
        return (
            <Animated.View style={[styles.entranceAnimatedWrap,
                                  {opacity:this.state.opacityAni}]}
            >
                <AnimatedIcon name='weixin' 
                              size={60}
                              style={[styles.entranceAnimated,
                                     {transform:[{scale:this.state.transformAni}]}]}
                />
            </Animated.View>
        );
    }
}


export default class EntranceAnimationTest extends Component{
    constructor(){
        super();
        this.state = {
            show : true,
        }
    }
    _handleAnimatedEnd(){
        this.setState({show:false})
    }
    render(){
        let entranceAnimated = this.state.show ? <EntranceAnimation handleAnimatedEnd={()=>this._handleAnimatedEnd()} /> : <View></View>;
        return(
            <View>
                <HomePageTest />
                {entranceAnimated}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    entranceAnimatedWrap: {
        position: "absolute",
        top:0, 
        left:0,
        width: Util.phoneWidth,
        height: Util.phoneHeight,
        backgroundColor: '#0000ff',
        alignItems:"center",
        justifyContent:"center",
    },
    entranceAnimated: {
        color: '#ffffff',
    },
    homePageTestWrap: {
        width: Util.phoneWidth,
        height: Util.phoneHeight,
        alignItems:"center",
        justifyContent:"center",
    },
    HomePageTestContent: {
        color: '#000000',
        fontSize: 50,
    }
})