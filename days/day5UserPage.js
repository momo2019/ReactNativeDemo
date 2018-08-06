import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, PanResponder, TouchableHighlight } from 'react-native';
import MyIcon from './iconfont/MyIcon';
import Util from './util';


const UserInfo = (props) => {
    return (
        <View style={styles.userInfoBox}>
            <View style={{flex:3}}>
                <Image source={require('./images/headScu.jpg')} 
                       style={[styles.userInfoHeadScu,
                              {top: props.headScuTop,
                               transform: [{scale: props.headScuScale}]}]}
                />
            </View>
            <View style={{flex:5, top: 30, flexDirection: 'row', alignItems:"center"}}>
                <MyIcon name='shezhi'
                        style={[styles.userInfoConfig,{flex: 1}]}
                />
                <View style={[styles.userInfoEdit,{flex: 4}]}>
                    <MyIcon name='yonghu'
                            style={[styles.userInfoBorder,
                                    styles.userInfoEditUser,]}
                    />
                    <Text style={[styles.userInfoBorder, styles.userInfoEditOwn]}>
                        编辑个人资料
                </Text>
                </View>
            </View>
        </View>
    )
}

const UserName = (props) => {
    let info = props.info;
    return (
        <View>
            <Text>
                {info.name}
            </Text>
            <Text>
                {info.simpInfo}
            </Text>
            <View>
                <Text>
                    {info.focusNum + ' 正在关注'}
                </Text>
                <Text>
                    {info.focusedNum + ' 关注者'}
                </Text>
            </View>
        </View>
    )
}

export default class UserPage extends Component{
    constructor(){
        super();
        this.state = {
            headScuScale: 1,
            headScuTop: 0,
            showBanner: false,
            bannerBlurOpacity: 0,
        }
    }

    _userInfo = {
        headScu: '',
        info: {
            name: 'momo',
            simpInfo: 'dddeee',
            focusNum: 200,
            focusedNum: 2
        }
    }

    _prevTop=0;
    _cardStyles={}


    _updatePosition = () => {
        this.card && this.card.setNativeProps(this._cardStyles);
    }

    _userInfoMove = (evt, gestureState) => {
        let nowTop = this._prevTop + gestureState.dy;
        if(nowTop > 0){
            this._cardStyles.top = 0;
            this.setState({headScuScale:1,
                           headScuTop:0});
        }else if(nowTop >= -100){
            this._cardStyles.top = nowTop;
            this.setState({headScuScale:1+(nowTop/100)*0.3,
                           headScuTop:(-nowTop/100)*15,
                           showBanner:false});
        }else{
            this._cardStyles.top = nowTop;
            this.setState({showBanner:true,
                           bannerBlurOpacity:((-nowTop-100)/80)})
        }
        this._updatePosition();
    }
    _endMove = (evt, gestureState) => {      
        this._prevTop = this._cardStyles.top;
    }
    componentWillMount(){
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dy / gestureState.dx != 0,
            onPanResponderGrant: (evt, gestureState) => {},
            onPanResponderMove: (evt, gestureState) => this._userInfoMove(evt, gestureState),
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => this._endMove(evt, gestureState),
            onPanResponderTerminate: (evt, gestureState) => this._endMove(evt, gestureState),
            onShouldBlockNativeResponder: (event, gestureState) => true,
        })
        this._cardStyles = {
            top: this._prevTop
        }
    }


    render(){
        let showBanner = this.state.showBanner?<View><Image style={[styles.userInfoBanner,styles.userInforShowBanner]} 
                                                            source={require('./images/banner.png')}
                                                /></View>:<View></View>;
        let showBannerBlur = this.state.showBanner?<View style={[styles.userInfoBanner,
                                                                {opacity:this.state.bannerBlurOpacity}]}
                                                   >
                                                        <Image style={[styles.userInfoBanner,styles.userInforShowBanner]} 
                                                                        source={require('./images/bannerBlur.png')}
                                                        />
                                                        <Text style={styles.userInfoShowText}
                                                        >
                                                            {this._userInfo.info.name}
                                                        </Text>
                                                    </View>:<View></View>;
        return (
            <View>
                <View {...this._panResponder.panHandlers} 
                    style={styles.userInfoCard}
                    ref={(dom)=>this.card = dom}
                >
                    <Image source={require('./images/banner.png')} 
                           style={styles.userInfoBanner}/>
                    <TouchableHighlight style={styles.userInfoWrap}>
                        <View >
                            <UserInfo headScu={this._userInfo.headScu} 
                                      headScuScale={this.state.headScuScale}
                                      headScuTop={this.state.headScuTop}          
                            />
                            <UserName info={this._userInfo.info}/>
                        </View>
                    </TouchableHighlight>
                </View>
                {showBanner}
                {showBannerBlur}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    userInfoCard: {
        position: 'absolute',
        top: 0,
    },
    userInfoBanner: {
        width: Util.phoneWidth,
        height: 150
    },
    userInforShowBanner:{
        position: 'absolute', 
        top: -100,
        left: 0,
    },
    userInfoShowText: {
        position: 'absolute',
        width: Util.phoneWidth,
        height: 50,
        top: 0,
        left: 0,
        color: '#000000',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 50,
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
    userInfoWrap: {
        top: -20,
        height: Util.phoneHeight,
        backgroundColor: 'transparent',
    },
    userInfoBox: {
        flexDirection: 'row',
        justifyContent:"center",
    },
    userInfoHeadScu: {
        width: 80,
        height: 80,
        marginLeft: 20,
        borderWidth: 3,
        borderColor: '#ffffff',
        borderRadius: 3,
    },
    userInfoBorder: {
        margin: 2,
        borderWidth: 1,
        borderColor: '#eeeeee',
        borderRadius: 1,
    },
    userInfoConfig: {
        textAlign: 'center',
        fontSize: 26,
    },
    userInfoEdit: {
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:"center",
    },
    userInfoEditUser: {
        flex: 1,
        textAlign: 'center',
        fontSize: 26,
    },
    userInfoEditOwn: {
        flex: 4,
        textAlign: 'center',
        fontSize: 18,
    }
})