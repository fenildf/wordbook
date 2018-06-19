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


export default BookItem;