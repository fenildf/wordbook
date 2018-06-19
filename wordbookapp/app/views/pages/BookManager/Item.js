'use strict'

import React from 'react';

import Text from './../../components/Text';
import {View} from 'react-native';
import StyleSheet from './../../../util/StyleSheet';
import RadioItem from './../../components/RadioItem';
function Item(props){
    let {
        book,
        onSelected
    } = props;

    return (
        <RadioItem 
            onSelected={onSelected}
            style={styles.button}>
            <View
                style={styles.main}>
                <Text
                    style={styles.name}>
                    {book.name}
                </Text>
            </View>
        </RadioItem>
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
        },
    }
});


export default Item;