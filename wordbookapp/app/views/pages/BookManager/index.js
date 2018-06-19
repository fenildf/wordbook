'use strict'
import React,{Component}from 'react'

import {
    View,
    InteractionManager
} from 'react-native';


import {createDispatcher} from 'react-febrest';
import {dispatch} from 'febrest';
import actions from '../../../constants/actions';
import StyleSheet from './../../../util/StyleSheet';

class BookManager extends Component{
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:'管理我的单词本'
        }
    }
    render(){
        return (
            <View />
        );
    }
}

export default BookManager;