'use strict'

import React from 'react';

import FontIcon from './../../components/FontIcon';
import Text from './../../components/Text';
import {View} from 'react-native';
import TouchableOpacity from './../../components/TouchableOpacity'; 
import StyleSheet from './../../../util/StyleSheet';
import IconItem from './../../components/IconItem';
function Main(props){
    let {
        onShowMeaning,
        word
    } = props;

    return (
        <View
            style={styles.wrapper}>
            <Text>{word.name}</Text>
            <TouchableOpacity
                onPress={onShowMeaning}>
                <Text
                    style={styles.color}>给我一个解释</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create(function(theme){
    return {
        wrapper:{
            justifyContent:'space-between',
            alignItems:'center',
            height:theme.itemHeightM,
            flexDirection:'row',
            paddingHorizontal:theme.paddingHorizontal
        },
        color:{
            color:'#b8879c'
        }
    }
});


export default Main;