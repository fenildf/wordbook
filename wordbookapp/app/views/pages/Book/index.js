'use strcit'
import React from 'react'

import {
    View
} from 'react-native';

import Text from './../../components/Text';
import Section from './../../components/Section';
import ScreenComponent from './../../components/ScreenComponent';
import ScrollView from './../../components/ScrollView';
import {createDispatcher} from 'react-febrest';
import {dispatch} from 'febrest';
import actions from '../../../constants/actions';
import FlatList from './../../components/FlatList';
import Word from './Word';
class Book extends ScreenComponent{
    constructor(...props){
        super(...props);
        let params = this.getScreen().getNavigation().state.params||{};
        let book = params.book||{}
        this.navigationOptions = {
            title:book.name||'单词本'
        }
        this.state = {
            words:[],
            book
        }
        this.dispatcher = createDispatcher(this,this._onData);
    }
    _onData(data){
    }

    componentDidMount() {
        this._getWords();
    }
    _getWords(){
        let {name} = this.state.book
        this.dispatcher.dispatch(actions.WORD_GET_WORDS,{bookName:name})
    }
    _renderItem=({item})=>{
        return (
            <Word 
                word={item}/>
        )
    }
    _keyExtractor=(item)=>{
        return item.id+'';
    }
    render(){
        return (
            <FlatList 
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                data={this.state.words} />
        )
    }
}


export default Book;