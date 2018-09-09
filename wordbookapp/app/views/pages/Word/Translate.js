'use strict'
import React,{Component} from 'react';
import {View} from 'react-native';

import TouchableOpactity from './../../components/TouchableOpacity';
import Text from './../../components/Text';
import StyleSheet from 'react-native-theme-stylesheet';
class Translate extends Component{
    constructor(...props){
        super(...props);
        this.state = {
            isShow:true
        }
    }
    hide(){
        this.setState({isShow:false});
    }
    show(){
        this.setState({isShow:true});
    }
    render(){
        let {onPress} = this.props;
        return (
            <TouchableOpactity
                onPress={onPress}
                style={styles.button}>
                <Text
                    style={styles.text}>
                    释义
                </Text>
            </TouchableOpactity>
        );
    }
}


const styles = StyleSheet.create(function(theme){
    return {
        button: {
            position:'absolute',
            right:30,
            width:60,
            height:60,
            justifyContent:'center',
            alignItems:'center',
            bottom:60,
            borderRadius:30,
            backgroundColor:'#b8879c'

        },
        text: {
            //backgroundColor:theme.wordPageBackgroundColor,
            color:theme.wordPageColor,
            backgroundColor:'transparent',
        }
    }
})

export default Translate;