import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; 
import Util from './util';


const HomePageTest = () => {
    return (
        <View style={styles.homePageTestWrap}>
            <Text style={styles.HomePageTestContent}>这里是主页</Text>
        </View>
    );
}
const styles = StyleSheet.create({
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

export default HomePageTest;