'use strict'
import React from 'react';
import {View} from 'react-native';
import Text from './../Text';
import StyleSheet from './../../../util/StyleSheet';

function Empty(){
    return (
        <View
            style={styles.wrapper}>
            <Text
                style={styles.text}>
                抱歉，未能找到您想要的内容。
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