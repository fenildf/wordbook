'use strict'

import React from 'react';

import FontIcon from './../../components/FontIcon';
import Text from './../../components/Text';
import {View} from 'react-native';
import TouchableOpacity from './../../components/TouchableOpacity'; 
import StyleSheet from './../../../util/StyleSheet';
import IconItem from './../../components/IconItem';
function Footer(props){
    let {
        onRemember,
        onForget,
        onPreview
    } = props;

    return (
        <View
            style={styles.row}>
            <TouchableOpacity
                onPress={onPreview}
                style={[styles.item,styles.i1]}>
                <Text
                    style={styles.text}>
                    上一个
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onRemember}

                style={[styles.item,styles.i2]}>
                <Text
                    style={styles.text}>
                    认识的
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onForget}
                style={[styles.item,,styles.i3]}>
                <Text
                    style={styles.text}>
                    不认识
                </Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create(function(theme){
    return {
        row:{
            flexDirection:'row',
            height:theme.itemHeightM,

        },
        item:{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        },
        i1:{
           backgroundColor:'#e0bfc8' 

        },
        i2:{
            backgroundColor:'#88b7c9' 

        },
        i3:{
            backgroundColor:'#51658a' 
        },
        text:{
            color:theme.color,
        }
    }
});


export default Footer;