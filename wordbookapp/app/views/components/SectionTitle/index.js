'use strict'

import React from 'react';
import FontIcon from './../FontIcon';
import {
    View, 
} from 'react-native';
import Text from './../Text';
import StyleSheet from './../../../util/StyleSheet';

function SectionTitle(props){
    return (
        <View
            style={[styles.row,props.style]}>
            <FontIcon 
                name='md-bookmarks'
                /> 
            <Text
                style={styles.text}>
                {props.title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create(function(theme){
    return {
        row:{
            flexDirection:'row',
            height:theme.itemHeightM,
            paddingHorizontal:theme.paddingHorizontal,
            backgroundColor:'#fff',
            alignItems:'center'
        },
        text:{
            fontSize:theme.f3,
            marginLeft:8
        }
    }
});

export default SectionTitle;