'use strcit'
import React from 'react'

import {
    View
} from 'react-native';

import Text from './../../components/Text';
import ScreenComponent from './../../components/ScreenComponent';
class Book extends ScreenComponent{
    constructor(...props){
        super(...props);
        let params = this.getScreen().getNavigation().state.params||{};
        let book = params.book||{}
        this.navigationOptions = {
            title:book.name||'单词本'
        }
    }
    render(){
        return (
            <View />
        )
    }
}


export default Book;