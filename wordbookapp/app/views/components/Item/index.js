import React,{Component} from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native'

function Item(props){
    return (
        <TouchableOpacity
            onPress={props.onPress}
            activeOpacity={1}
            onLayout={props.onLayout}
            style={[styles.item,props.style]}
            >
            {props.children}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item:{
        backgroundColor:'#fff',
        height:44,
        flexDirection:'row'
    }
});

export default Item;