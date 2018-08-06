import React,{Component} from 'react';
import {View, FlatList, ScrollView, StyleSheet, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import MyIcon from './iconfont/MyIcon';
import Util from './util';


const WeatherHeader = (props) => {
    let _weatherHeaderData = props.weatherHeaderData;
    return (
        <View style={[styles.weatherHeader,
                        styles.weatherBottomBorder]}
        >
            <Text style={[styles.weatherHeaderCity,
                            styles.weatherFontColor]}
            > 
                {_weatherHeaderData.city}
            </Text>
            <Text style={[styles.weatherHeaderWeather,
                            styles.weatherFontColor]}
            > 
                {_weatherHeaderData.weather}
            </Text>
            <Text style={[styles.weatherHeaderTemperature,
                            styles.weatherFontColor]}
            >
                {_weatherHeaderData.temperature + '°'}
            </Text>
            <View style={styles.weatherWeekTempWarp}>
                <Text style={[styles.weatherWeek,
                                styles.weatherFontColor]}
                >
                    {_weatherHeaderData.nowDay}
                </Text>
                <Text style={[styles.weatherTemperature,
                                styles.weatherFontColor]}
                >
                    {_weatherHeaderData.temperature}
                </Text>
            </View>
        </View>
    )
}

const WeatherTime = (props) => {
    return (
        <FlatList
            style={styles.weatherBottomBorder}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={props.weatherTimeData}
            keyExtractor={(item,index)=>'weatherTime' + index}
            renderItem={({item})=>(
                <View style={styles.weatherTimeWarp}>
                    <Text style={[styles.weatherFontColor,
                                    styles.weatherTimeTime]}
                    >
                        {item.time + '时'}
                    </Text>
                    <MyIcon name={item.weather} 
                            style={[styles.weatherFontColor,
                                    styles.weatherTimeWeather]}
                    />
                    <Text style={[styles.weatherFontColor,
                                    styles.weatherTimeTemperature]}
                    >
                        {item.temperature + '°'}
                    </Text>  
                </View>
            )}
        >
        </FlatList>
    )
}

const WeatherDaysLists = (props) => {
    return (
        <View style={styles.weatherBottomBorder}>
            {
                props.weatherDaysListsData.map((item,index)=>(
                    <View key={'weekDay' + index}
                            style={styles.weatherListsWrap}
                    >
                        <Text style={[styles.weatherWeek,
                                styles.weatherFontColor]}
                        >
                            {item.week}
                        </Text>
                        <MyIcon name={item.weather} 
                                style={[styles.weatherFontColor,
                                        styles.weatherListsWeather]}
                        />
                        <Text style={[styles.weatherTemperature,
                                    styles.weatherFontColor]}
                        >
                            {item.temperature}
                        </Text>
                    </View>
                ))
            }
        </View>
    )
}

const WeatherAdvise = (props) => {
    return (
        <View>
            {
                props.weatherAdviseData.map((item,index)=>(
                    <View key={'advise'+index}
                            style={styles.weatherAdviseWarp}
                    >
                        <Text style={[styles.weatherAdviseAdvise,   
                                        styles.weatherFontColor]}
                        >
                            {item.advise + ":"}
                        </Text>
                        <Text style={[styles.weatherAdviseDetail,
                                        styles.weatherFontColor]}
                        >
                            {item.detail}
                        </Text>
                    </View>
                ))
            }
        </View>
    )
}

const WeatherCard = (props) => {
    _weatherData = props.weatherData;
    return(
        <View style={[props.cardStyle,styles.weatherCard]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <WeatherHeader weatherHeaderData={_weatherData.weatherHeaderData}/>
                <WeatherTime weatherTimeData={_weatherData.weatherTimeData}/>
                <WeatherDaysLists weatherDaysListsData={_weatherData.weatherDaysListsData} />
                <WeatherAdvise weatherAdviseData={_weatherData.weatherAdviseData} />
            </ScrollView>
        </View>
    )
}

export default class Weather extends Component{
    constructor(){
        super();
        this.weatherData = {
            "weatherHeaderData": {
                                    "city": '太仓',
                                    "weather": 'dayu',
                                    "temperature": 12,
                                    "nowDay": '星期天',
                                 },
            "weatherTimeData": [{
                                    "time": 12,
                                    "weather": 'dayu',
                                    "temperature": 16,
                                },{
                                    "time": 12,
                                    "weather": 'dayu',
                                    "temperature": 16,
                                },{
                                    "time": 12,
                                    "weather": 'dayu',
                                    "temperature": 16,
                                },{
                                    "time": 12,
                                    "weather": 'dayu',
                                    "temperature": 16,
                                },{
                                    "time": 12,
                                    "weather": 'dayu',
                                    "temperature": 16,
                                },{
                                    "time": 12,
                                    "weather": 'dayu',
                                    "temperature": 16,
                                },{
                                    "time": 12,
                                    "weather": 'dayu',
                                    "temperature": 16,
                                },{
                                    "time": 12,
                                    "weather": 'dayu',
                                    "temperature": 16,
                                },{
                                    "time": 12,
                                    "weather": 'dayu',
                                    "temperature": 16,
                                },{
                                    "time": 12,
                                    "weather": 'dayu',
                                    "temperature": 16,
                                }],
            "weatherDaysListsData": [{
                                        "week": '星期一',
                                        "weather": 'dayu',
                                        "temperature": 12
                                    },{
                                        "week": '星期一',
                                        "weather": 'dayu',
                                        "temperature": 12
                                    },{
                                        "week": '星期一',
                                        "weather": 'dayu',
                                        "temperature": 12
                                    },{
                                        "week": '星期一',
                                        "weather": 'dayu',
                                        "temperature": 12
                                    },{
                                        "week": '星期一',
                                        "weather": 'dayu',
                                        "temperature": 12
                                    },{
                                        "week": '星期一',
                                        "weather": 'dayu',
                                        "temperature": 12
                                    },{
                                        "week": '星期一',
                                        "weather": 'dayu',
                                        "temperature": 12
                                    }],
            "weatherAdviseData": [{
                                        "advise": '建议一',
                                        "detail": '建议一如是说道'
                                    },{
                                        "advise": '建议一',
                                        "detail": '建议一如是说道'
                                    },{
                                        "advise": '建议一',
                                        "detail": '建议一如是说道'
                                    },{
                                        "advise": '建议一',
                                        "detail": '建议一如是说道'
                                    },{
                                        "advise": '建议一',
                                        "detail": '建议一如是说道'
                                    },]
        };
    }
    render(){
        return (
            <Swiper
                loop={false}
                showsButtons={false}
                paginationStyle={styles.weatherSwiperPagination}
                dot={
                    <View style={styles.weatherSwiperDot} />
                }
                activeDot={
                    <View style={styles.weatherSwiperActiveDot} />
                }
            >
                <WeatherCard weatherData={this.weatherData} 
                             cardStyle={styles.weatherCardColor1}
                />
                <WeatherCard weatherData={this.weatherData} 
                             cardStyle={styles.weatherCardColor2}
                />
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    // header
    weatherHeader: {
        alignItems: 'center',
    },
    weatherHeaderCity: {
        fontSize: 30,
    },
    weatherHeaderWeather: {
        fontSize: 20,
    },
    weatherHeaderTemperature: {
        fontSize: 100,
    },
    // header end
    // time
    weatherWeekTempWarp: {
        flexDirection: 'row',
    },

    weatherTimeWarp: {
        alignItems: 'center',
        width: 50,
        height: 100,
    },
    weatherTimeTime: {
        fontSize:14,
        marginTop: 10,
        marginBottom: 10,
    },
    weatherTimeWeather: {
        fontSize:20,
        marginBottom: 10,
    },
    weatherTimeTemperature: {
        fontSize: 16,
        marginBottom: 10,
    },
    // time end
    // lists
    weatherListsWrap: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
    },
    weatherListsWeather: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
    },
    // lists end
    // advise
    weatherAdviseWarp: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    weatherAdviseAdvise: {
        flex: 1,
        marginRight: 10,
        textAlign: 'right',
    },
    weatherAdviseDetail: {
        flex: 1,
        marginLeft: 10,
    },
    // advise end
    // swiper
    weatherSwiperPagination:{
        bottom:10, 
        paddingTop:10, 
        borderTopColor: "rgba(255,255,255,0.7)",
        borderTopWidth: 1
    },
    weatherSwiperDot:{
        backgroundColor: 'rgba(255,255,255,0.2)', 
        width: 6, 
        height: 6, 
        borderRadius: 3, 
        marginLeft: 3, 
        marginRight: 3, 
        marginTop: 3, 
        marginBottom: 3,
    },
    weatherSwiperActiveDot:{
        backgroundColor: 'rgba(255,255,255,0.5)', 
        width: 6, 
        height: 6, 
        borderRadius: 3, 
        marginLeft: 3, 
        marginRight: 3, 
        marginTop: 3, 
        marginBottom: 3,
    },
    // swiper end

    // card
    weatherCard: {
        height: Util.phoneHeight,
        paddingBottom: 60,
    },
    weatherCardColor1: {
        backgroundColor: '#2222ff',
    },
    weatherCardColor2: {
        backgroundColor: '#22ffff',
    },
    // card end
    //公共
    weatherWeek: {
        flex: 1,   
        marginLeft: 10,     
    },
    weatherTemperature: {
        flex: 1, 
        marginRight: 10,
        textAlign: 'right',       
    },
    weatherBottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.7)",
    },
    weatherFontColor: {
        color: '#ffffff',
    },
})