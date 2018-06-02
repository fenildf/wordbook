'use strict'

import React from 'react';

import FontIcon from './../../components/FontIcon';
import Text from './../../components/Text';
import {View} from 'react-native';
import TouchableOpacity from './../../components/TouchableOpacity'; 
import StyleSheet from './../../../util/StyleSheet';
import IconItem from './../../components/IconItem';
import ScrollView from './../../components/ScrollView';
function Meaning(props){
    let {
        onPress,
        word
    } = props;

    return (
        <ScrollView
            style={styles.wrapper}>
           
        </ScrollView>
    );
}


const styles = StyleSheet.create(function(theme){
    return {
        row:{
            flex:1
        }
    }
});


export default Meaning;