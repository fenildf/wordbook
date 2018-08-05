'use strict'
import React,{Component} from 'react';
import {
    View,
} from 'react-native';

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
            <View>
            </View>
        );
    }
}

export default AddWord;