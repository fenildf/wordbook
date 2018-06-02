'use strict'

import React from 'react';

import FontIcom from './../../components/FontIcon';
import TouchableOpacity from './../../components/TouchableOpacity'; 
import StyleSheet from './../../../util/StyleSheet';
function AddButton(props){
    let {
        onPress 
    } = props;

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}>
        </TouchableOpacity>
    );
}




export default AddButton;