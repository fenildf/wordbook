import React,{Component} from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native'

import StyleSheet from 'react-native-theme-stylesheet'

function Item(props){
    return (
        <TouchableOpacity
            onPress={props.onPress}
            onLongPress={props.onLongPress}
            activeOpacity={1}
            onLayout={props.onLayout}
            style={[styles.item,props.style]}
            >
            {props.children}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create(function(theme){
    return {
        item:{
            backgroundColor:'#fff',
            height:48,
            flexDirection:'row',
            alignItems:'center',
            paddingHorizontal:theme.paddingHorizontal
        }
    }
});

export default Item;