'use strict'

import React from 'react';

import Text from './../../components/Text';

import StyleSheet from './../../../util/StyleSheet';
import Item from './../../components/Item';
function AddButton(props){
    let {
        onPress 
    } = props;

    return (
        <Item 
            onPress={onPress}
            style={styles.button}>
             <Text>
                删除单词本
            </Text>
        </Item>
    );
}


const styles = StyleSheet.create(function(theme){
    return {
        button:{
            flexDirection:'row',
            height:theme.itemHeightM,
            alignItems:'center',
            backgroundColor:'#fff',
            justifyContent:'center',

        }
    }
});


export default AddButton;