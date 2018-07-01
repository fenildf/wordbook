'use strict'

import React from 'react';

import FontIcon from './../../components/FontIcon';
import Text from './../../components/Text';

import TouchableOpacity from './../../components/TouchableOpacity'; 
import StyleSheet from './../../../util/StyleSheet';
import IconItem from './../../components/IconItem';
function AddButton(props){
    let {
        onPress 
    } = props;

    return (
        <IconItem 
            onPress={onPress}
            style={styles.button}>
             <Text>
                添加单词本
            </Text>
        </IconItem>
    );
}


const styles = StyleSheet.create(function(theme){
    return {
        button:{
            flexDirection:'row',
            height:theme.itemHeightH,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:theme.backgroundColor,
            borderTopColor:theme.borderColor,
            borderTopWidth:theme.px,
        }
    }
});


export default AddButton;