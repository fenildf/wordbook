'use strict'
import React from 'react';
import {
    View
} from 'react-native';
import Text from './../Text';
import TouchableOpacity from './../TouchableOpacity';
import FontIcon from './../FontIcon';
import StyleSheet from 'react-native-theme-stylesheet';

function BookAddItem({name,classify,count,style,onPress}){
    return (
        <View
            style={[styles.wrapper,style]}>
            <View
                style={styles.item}>
                <Text
                    style={styles.name}>
                    {name}
                    <Text
                        style={styles.classify}>  {classify}</Text>
                </Text>
                
                <Text
                    style={styles.count}>共有单词{count}个</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}>
                <FontIcon name='ios-add-outline'/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create(function(theme){
    return {
        wrapper:{
            flexDirection:'row',
            height:theme.itemHeightH,
            backgroundColor:theme.backgroundColor,
            paddingHorizontal:theme.paddingHorizontal,
            borderTopColor:theme.borderColor,
            borderTopWidth:theme.px
        },
        item:{
            flex:1,
            justifyContent:'space-around'
        },
        name:{
            fontSize:theme.f3,
        },
        classify:{
            fontSize:theme.f2,
            color:theme.tipColor,
            paddingLeft:12
        },
        count:{
            fontSize:theme.f2,
            color:theme.tipColor
        },
        button:{
            paddingHorizontal:10,
            height:20,
            alignSelf:'center',
            backgroundColor:'#f5f5f588',
            borderColor:theme.borderColor,
            borderWidth:theme.px
        }
    }
})

export default BookAddItem;