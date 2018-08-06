import React,{Component} from 'react';
import {StyleSheet, View, Text, Button, FlatList} from 'react-native';

const initTime = '00:00.00';
const mTime = 70;

const TimeTable = (props) => {
    return (
        <View>
            <Text style={styles.intervalTime}>
                {props.intervalTime}
            </Text>
            <Text style={styles.passedTime}>
                {props.passedTime}
            </Text>
        </View>
    )
}

const TimeControl = (props) => {
    return (
        <View style={styles.buttonGroup}>
            <View style={styles.button}>
                <Button 
                    title={props.running? '计次' : '复位'}
                    onPress={props.handleRecordOrReset}
                ></Button>
            </View>
            <View style={styles.button}>
                <Button 
                    title={props.running ? '暂停' : '开始'}
                    onPress={props.handlePauseOrStart}
                ></Button>
            </View>
        </View>
    )
}

export default class StopWatch extends Component{
    constructor(){
        super();
        this.state = {
            running: false,
            passedTime: initTime,
            intervalTime: initTime,
            recordLists: []
        };
        this.intervalFunc = null;
    }

    _handleRecordOrReset = ()=>{
        let that = this;
        let flag = this.state.running;
        if(!flag){
            this.setState({passedTime:initTime,
                           intervalTime:initTime,
                           recordLists:[]});
        }else{
            this.setState({recordLists:addRecord(this.state.recordLists),
                           intervalTime:initTime});
        }

        function addRecord(oldLists){
            let newLists = oldLists.map(value=> JSON.parse(JSON.stringify(value)));
            let addItem = {
                'recordId': newLists.length, 
                'passed': that.state.passedTime,
                'interval': that.state.intervalTime
            }
            newLists.unshift(addItem);
            return newLists;
        }
    }

    _handlePauseOrStart = ()=>{
        let that = this;
        let flag = this.state.running;
        if(!flag){
            let handleTimeRunning = (currentTime)=>{
                let newTime = '';
                let tempTime = currentTime.split(/\:|\./g).map(value=>parseInt(value));
                let length = tempTime.length;
                let addTime = mTime/10;
                for(let i=length-1, carry=0;i>=0;i--){
                    if(i === (length-1)){
                        tempTime[i] = tempTime[i] + addTime;
                        carry = parseInt(tempTime[i] / 100);
                        tempTime[i] = tempTime[i] - carry*100;
                    }else{
                        tempTime[i] = tempTime[i] + carry;
                        carry = parseInt(tempTime[i] / 60);
                        tempTime[i] = tempTime[i] - carry*60;
                    }
                }
                for(let j=0;j<length;j++){
                    if(tempTime[j] < 10){
                        newTime = newTime + '0';
                    }
                    newTime = newTime + tempTime[j];
                    switch(j){
                        case 0: newTime = newTime + ':'; break;
                        case 1: newTime = newTime + '.'; break;
                        default: break;
                    }
                }
                return newTime;
            }
            this.setState({passedTime:handleTimeRunning(that.state.passedTime),
                           intervalTime:handleTimeRunning(that.state.intervalTime)}); //立即开始，不然延迟了mTime时间
            this.intervalFunc = setInterval(function(){
                that.setState({passedTime:handleTimeRunning(that.state.passedTime),
                               intervalTime:handleTimeRunning(that.state.intervalTime)});
            },mTime)
            this.setState({running:!flag});
        }else{
            clearInterval(this.intervalFunc);
            this.setState({running:!flag});
        }
    }


    _keyExtractor = (item) => 'record' + item.recordId;

    _renderItem = ({item}) => (
        <View style={styles.recordItem}>
            <View style={styles.itemContent}>
                <Text style={styles.itemIndex}>{'记录'+(item.recordId+1)}</Text>
            </View>
            <View style={styles.itemContent}>
                <Text style={styles.itemInterval}>{'+'+item.interval}</Text>
            </View>
            <View style={styles.itemContent}>
                <Text style={styles.itemPassed}>{item.passed}</Text>
            </View>
        </View>
    );

    render(){
        return (
            <View>
                <TimeTable 
                    passedTime={this.state.passedTime} 
                    intervalTime={this.state.intervalTime}
                />
                <TimeControl
                    running={this.state.running}
                    handleRecordOrReset={()=>this._handleRecordOrReset()}
                    handlePauseOrStart={()=>this._handlePauseOrStart()}
                />
                <FlatList
                    data={this.state.recordLists}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    style={styles.flatList}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    intervalTime: {
        textAlign: 'right',
    },
    passedTime: {
        fontSize: 20,
        textAlign: 'right',
    },
    buttonGroup: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
    },
    flatList: {
        height: 400,
    },
    recordItem: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        textAlign: 'center',
        justifyContent: 'center',
    },
    itemContent: {
        flex: 1,
        justifyContent: 'center',
    },
    itemIndex: {
        fontSize: 18,
    },
    itemInterval: {
        color: '#aaaaaa',
        textAlign: 'center',
    },
    itemPassed: {
        textAlign: 'right',
    }
});