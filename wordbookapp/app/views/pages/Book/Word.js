'use strict'

import React from 'react';

import FontIcon from './../../components/FontIcon';
import Text from './../../components/Text';
import {View} from 'react-native';
import TouchableOpacity from './../../components/TouchableOpacity'; 
import StyleSheet from './../../../util/StyleSheet';
import IconItem from './../../components/IconItem';
function Word(props){
    let {
        onPress,
        word
    } = props;

    return (
        <IconItem 
            onPress={onPress}
            style={styles.button}>
            <View
                style={styles.main}>
                <Text
                    style={styles.name}>
                    {word.name}
                </Text>
            </View>
        </IconItem>
    );
}


const styles = StyleSheet.create(function(theme){
    return {
        button:{
            flexDirection:'row',
            height:theme.itemHeightM,
            alignItems:'center',
            backgroundColor:'#fff',

        },
        main:{
            flexDirection:'column',
            justifyContent:'center'
        },
        name:{
            marginBottom:4
        },
        position:{
            fontSize:theme.f1
        }
    }
});


export default Word;