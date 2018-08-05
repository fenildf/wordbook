'use strict'
import React,{Component} from 'react';
import {
    View,
} from 'react-native';

import TouchableOpacity from './../../components/TouchableOpacity';
import Text from './../../components/Text';
import StyleSheet from './../../../util/StyleSheet';
class AddWord extends Component{
    static routeConfig = {
        name:'AddWord'
    }
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:'添加新单词'
        }
    }
    render(){
        return (
            <View
                style={styles.wrapper}>
                <TouchableOpacity>
                    <Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const  styles = StyleSheet.create(theme=>{
    return {
        wrapper:{
            flex:1
        }
    }
})
export default AddWord;