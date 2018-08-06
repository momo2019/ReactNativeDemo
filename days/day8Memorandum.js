import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TextInput } from 'react-native';
import Util from './util';
import MyIcon from './iconfont/MyIcon';



const ListItem = (props) => {
    let data = props.content;
    let color = props.color;
    let opacity = data.selected ? {opacity:0.6} : {opacity:1};
    let choosen = data.selected ? {width:20,height:20,backgroundColor:color} : {width:0,height:0,backgroundColor:color};
    return (
        <View style={[opacity,styles.listItemRecord]}>
            <View style={styles.listItemButton}>
                <Text style={[styles.listItemChoosen,
                                choosen]}
                />
            </View>
            <Text style={styles.listItemText}>{data.content}</Text> 
        </View>
    )
}

export default class Memorandum extends Component {
    constructor(props){
        super(props);
        this.state = {
            input: '',
            listItemsData: this.props.itemData ? this.props.itemData.data : [
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
            ],
            number: this.props.itemData ? this.props.itemData.data.length : 3,
        }
        this.title = this.props.itemData ? this.props.itemData.title : 'default';
        this.color = this.props.itemData ? this.props.itemData.color : '#33ee3e';
    }

    _itemSelected = (index)=>{
        let tempData = this.state.listItemsData.slice();
        let tempNum = this.state.number;
        tempData[index].selected = !tempData[index].selected;
        tempNum = tempData[index].selected ? --tempNum : ++tempNum;
        this.setState({
            listItemsData: tempData,
            number: tempNum,
        })
    }
    
    _itemAdd = ()=>{
        let tempData = this.state.listItemsData.slice();
        let tempNum = this.state.number;
        let tempInput = { 
                            selected: false,
                            content:this.state.input 
                        };
        tempNum = ++tempNum;
        tempData.push(tempInput)
        this.setState({
            listItemsData: tempData,
            input: '',
            number: tempNum
        });
    }
    render() {
        let lists = this.state.listItemsData.map((item, index) =>
            <TouchableHighlight onPress={() => this._itemSelected(index)}
                key={'listItem' + index}
                underlayColor='transparent'
            >
                <ListItem content={item} color={this.color} />
            </TouchableHighlight>
        )
        return (
            <View style={styles.listItem}>
                <View style={styles.listItemTitleBox}>
                    <Text style={{
                        flex: 5,
                        fontSize: 40,
                        color: this.color,
                    }}
                    >
                        {this.title}
                    </Text>
                    <Text style={{
                        flex: 1,
                        fontSize: 40,
                        color: this.color,
                    }}
                    >
                        {this.state.number}
                    </Text>
                </View>
                {lists}
                <View style={styles.listItemAdd}>
                    <MyIcon name='weixin' style={styles.listItemAddIcon} />
                    <TextInput onChangeText={(v)=>this.setState({input:v})}
                               onSubmitEditing={()=>this._itemAdd()}
                               value={this.state.input}
                               style={styles.listItemAddInput}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listItem: {
        width: Util.phoneWidth,
        height: Util.phoneHeight,
        backgroundColor: '#ffffff'
    },
    listItemTitleBox: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
    },
    listItemRecord: {
        flexDirection: 'row',
        marginTop: 20,
    },
    listItemButton: {
        width: 30,
        height: 30,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItemChoosen: {
        borderRadius: 10,
    },
    listItemText: {
        flex: 1,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e3a4b5'
    },
    listItemAdd: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
    listItemAddIcon: {
        marginLeft: 15,
        marginRight: 15,
        fontSize: 20,
    },
    listItemAddInput: {
        flex: 1,
        padding: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#e3a4b5',
    }
})