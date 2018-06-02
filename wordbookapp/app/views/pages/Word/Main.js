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
        onPress,
        word
    } = props;

    return (
        <View
            style={styles.wrapper}>
            <Text>{word.name}</Text>
        </View>
    );
}


const styles = StyleSheet.create(function(theme){
    return {
        wrapper:{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        }
    }
});


export default Main;