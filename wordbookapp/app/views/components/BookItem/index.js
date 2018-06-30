'use strict'
import React from 'react';
import {
    View
} from 'react-native';
import Text from './../Text';


function BookItem({name,classify,count,style}){
    return (
        <View
            style={[styles.wrapper,style]}>
            <Text
                style={styles.name}>{name}</Text>
            <Text
                style={styles.classify}>{classify}</Text>
            <Text
                style={styles.count}>共有单词{count}</Text>
        </View>
    );
}

const styles = StyleSheet.create(function(theme){
    return {
        wrapper:{
            flexDirection:'row',
            height:theme.itemHeightM,
            alignItems:'center',
            backgroundColor:'#fff',
        },
        name:{
            fontSize:theme.f3
        },
        classify:{
            fontSize:theme.f2,
            color:theme.tipColor
        },
        count:{
            fontSize:theme.f2,
            color:theme.tipColor
        }
    }
})

export default BookItem;