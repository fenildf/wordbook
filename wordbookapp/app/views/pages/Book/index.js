'use strcit'
import React from 'react'

import {
    View,
    InteractionManager
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
    componentDidUpdate(){
        // InteractionManager.runAfterInteractions(()=>{
        //     this.refs.List.scrollToIndex({index:300,animated:true})
        // });
    }

    componentDidMount() {
        this._getWords();
    }
    _getWords(){
        let {name} = this.state.book
        this.dispatcher.dispatch(actions.WORD_GET_WORDS,{bookName:name})
    }
    _renderItem=({item,index})=>{
        let {book:{name},words} = this.state;
        item.index = index;
        return (
            <Word 
                onPress={()=>dispatch(actions.APP_NAVIGATE,{routeName:'Word',params:{bookName:name,word:item,words}})}
                word={item}/>
        )
    }
    _keyExtractor=(item)=>{
        return (item.id||item.name)+'';
    }
    render(){
        return (
            <FlatList 
                ref='List'
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                getItemLayout={(data, index) => (
                    {length: 48, offset: 48 * index, index}
                )}
                data={this.state.words} />
        )
    }
}


export default Book;