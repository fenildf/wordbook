import React,{Component} from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native'

function Item(props){
    return (
        <TouchableOpacity
            onPress={props.onPress}
            activeOpacity={1}
            style={[styles.item,props.style]}
            >
            {props.children}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item:{
        height:44,
        flexDirection:'row'
    }
});

export default Item;