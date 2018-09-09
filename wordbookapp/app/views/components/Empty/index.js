'use strict'
import React from 'react';
import {View} from 'react-native';
import Text from './../Text';
import StyleSheet from 'react-native-theme-stylesheet';

function Empty({text}){
    return (
        <View
            style={styles.wrapper}>
            <Text
                style={styles.text}>
                {text||'此页面暂无内容'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create(function(theme){
    return {
        wrapper:{
            justifyContent:'center',
            alignItems:'center',
            paddingVertical:12
        },
        text:{
            color:theme.tipColor
        }
    }
})
export default Empty;