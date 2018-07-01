'use strict'

import React from 'react';

import FontIcon from './../../components/FontIcon';
import Text from './../../components/Text';
import {View} from 'react-native';
import TouchableOpacity from './../../components/TouchableOpacity'; 
import StyleSheet from './../../../util/StyleSheet';
import IconItem from './../../components/IconItem';
function BookItem(props){
    let {
        onPress,
        book,
        onLongPress
    } = props;

    return (
        <IconItem 
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.button}>
            <View
                style={styles.main}>
                <Text
                    style={styles.name}>
                    {book.name}
                    {book.classify&&<Text style={styles.classify}>{book.classify}</Text>}
                </Text>
                <Text
                    style={styles.position}>
                    共有单词{book.count}个    {book.now?'上次学习时间'+new Date(book.now).toISOString():''}
                </Text>
            </View>
        </IconItem>
    );
}


const styles = StyleSheet.create(function(theme){
    return {
        button:{
            flexDirection:'row',
            height:theme.itemHeightH,
            backgroundColor:theme.backgroundColor,
            borderTopColor:theme.borderColor,
            borderTopWidth:theme.px,
        },
        main:{
            flex:1,
            height:theme.itemHeightH,
            justifyContent:'space-around',
        },
        classify:{
            fontSize:theme.f2,
            color:theme.tipColor,
            paddingLeft:12
        },
        name:{
            fontSize:theme.f3,
        },
        position:{
            fontSize:theme.f2,
            color:theme.tipColor
        }
    }
});


export default BookItem;