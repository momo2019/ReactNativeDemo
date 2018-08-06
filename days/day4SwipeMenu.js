import React,{ Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, PanResponder } from 'react-native';
import MyIcon from './iconfont/MyIcon';
import Util from './util';
import HomePageTest from './homePage';

const MenuItem = (props) => {
    let item = props.item;
    return (
        <TouchableHighlight underlayColor='#888888' onPress={item.handleItemPress}>
            <View style={styles.itemWrap}>
                <MyIcon name={item.iconName} 
                        style={styles.itemIcon} 
                />
                <Text style={styles.itemText}>
                    {item.itemName}
                </Text>
            </View>
        </TouchableHighlight>
    )
}
const MenuItemGroup = (props) => {
    return (
        <View style={styles.itemGroup}>
            {
                props.itemGroup.map((item,index)=>
                    <MenuItem key={props.groupId+ '-' +index} item={item} />
                )
            }
        </View>
    )
}
const MenuItems = (props) => {
    return (
        <View style={styles.menuItems}>
            {
                props.menuItems.map((item)=>
                    <MenuItemGroup key={item.itemGroupId} 
                                   itemGroup={item.itemGroupData}
                                   groupId={item.itemGroupId}
                    />
                )
            }
        </View>
    )
}

const LEFT_OFFSET = -0.7*Util.phoneWidth-10; //左偏离值

export default class SwipeMenu extends Component{
    constructor(){
        super();
        this.state = {
            showBackground: false,
        }
    }
    _menuItemsData = [{
        "itemGroupData": [{
                "handleItemPress": ()=>{alert(1)},
                "iconName": 'weixin',
                "itemName": '你的地点'
            },{
                "handleItemPress": ()=>{alert(1)},
                "iconName": 'weixin',
                "itemName": '你的地点'
            },{
                "handleItemPress": ()=>{alert(1)},
                "iconName": 'weixin',
                "itemName": '你的地点'
            }],
        "itemGroupId": 'menuItemGroup1'
    },{
        "itemGroupData": [{
                "handleItemPress": ()=>{alert(1)},
                "iconName": 'weixin',
                "itemName": '你的地点'
            },{
                "handleItemPress": ()=>{alert(1)},
                "iconName": 'weixin',
                "itemName": '你的地点'
            },{
                "handleItemPress": ()=>{alert(1)},
                "iconName": 'weixin',
                "itemName": '你的地点'
            }],
        "itemGroupId": 'menuItemGroup2'
    },]

    _openOrClose = false //启动时侧栏为打开还是关闭状态
    _menuStyles = {};  //setNativeProps的新样式
    _backStyle = {};
    _updatePosition = () => {
      this.menu && this.menu.setNativeProps(this._menuStyles);
      this.back && this.back.setNativeProps(this._backStyles);
    }
    _moveMenu = (evt, gestureState) => {
        if(!this._openOrClose){
            this._menuStyles.style.left = LEFT_OFFSET + gestureState.dx;
            this._backStyles.style.opacity = 0 + Math.pow(gestureState.dx / (-LEFT_OFFSET), 0.5);
        }else{
            this._menuStyles.style.left = 0 + gestureState.dx;
            this._backStyles.style.opacity = 1 - Math.pow(gestureState.dx / (LEFT_OFFSET), 0.5);
        };
        //校准
        if (this._menuStyles.style.left > 0) {
            this._menuStyles.style.left = 0;
            this._backStyles.style.opacity = 1;
        };
        if (this._menuStyles.style.left < LEFT_OFFSET) {
            this._menuStyles.style.left = LEFT_OFFSET;
            this._backStyles.style.opacity = 0;
        };
        //校准 end
        this._updatePosition();
    }
    _endMoveMenu = (evt, gestureState) => {
        if ((this._menuStyles.style.left < (LEFT_OFFSET/2)) || 
            (gestureState.vx < 0 && (this._menuStyles.style.left < (LEFT_OFFSET/5)))){
            this._menuStyles.style.left = LEFT_OFFSET;
            this._backStyles.style.opacity = 0;
            this.setState({
                showBackground: false
            })
            this._openOrClose = false;
        }else{
            this._menuStyles.style.left = 0;
            this._backStyles.style.opacity = 1;
            this.setState({
                showBackground: true
            })
            this._openOrClose = true;
        }
        this._updatePosition();
    }
    componentWillMount(){
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return true
            },
            onPanResponderGrant: (evt, gestureState) => {
                this.setState({showBackground: true})
            },
            onPanResponderMove: (evt, gestureState) => {
                this._moveMenu(evt,gestureState)
            },
            onPanResponderRelease: (evt, gestureState) => {
                this._endMoveMenu(evt, gestureState)
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderTerminate: (evt, gestureState) =>{
                this._endMoveMenu(evt, gestureState)
            },
            onShouldBlockNativeResponder: (event, gestureState) => true,
        })

        this._menuStyles = {
            style: {
                left: LEFT_OFFSET,
            },
        };
        this._backStyles = {
            style: {
                opacity: 0,
            },
        };
    }
   
    render() {
        return (
            <View>
                <HomePageTest />
                {this.state.showBackground? <View ref={(back)=>this.back = back} style={styles.menuBackground}></View>:<View></View>}
                <View {...this._panResponder.panHandlers} 
                       style={styles.sideMenu}
                       ref={(menu)=>this.menu = menu}
                >
                    <MenuItems menuItems={this._menuItemsData} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemWrap: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    itemIcon: {
        flex: 1,
        fontSize: 30,
        textAlign: 'center',
        color: '#000000'
    },
    itemText: {
        flex: 4,
        fontSize: 20,
    },
    itemGroup: {
        borderBottomWidth: 1,
        borderBottomColor: '#aaaaaa',
    },
    menuItems: {
        height: Util.phoneHeight,
        width: 0.7 * Util.phoneWidth,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
            height: 0,
            width: 2
        }
    },
    sideMenu: {
        position: 'absolute',
        height: Util.phoneHeight,
        width: 0.7 * Util.phoneWidth + 30,
        top: 0,
        left: LEFT_OFFSET,
        backgroundColor: 'transparent',
    },
    menuBackground: {
        position: 'absolute',
        height: Util.phoneHeight,
        width: Util.phoneWidth,
        left:0,
        top:0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        opacity: 0,
    }
})