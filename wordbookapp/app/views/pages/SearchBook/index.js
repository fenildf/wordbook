'use strict'

import React,{Component} from 'react';

import {
    View
} from 'react-native';

import StyleSheet from './../../../util/StyleSheet';

import Header from './Header';
import {createDispatcher} from 'react-febrest'
import actions from '../../../constants/actions';
import {dispatch} from 'febrest';
import FlatList from './../../components/FlatList';
import Item from './Item';
class SearchBook extends Component{
    static routeConfig={
        name:'SearchBook'
    }
    constructor(...props){
        super(...props);
        this.navigationOptions={
            title:'搜索',
            header:null
        }
        this.state={
            searchText:''
        }
        this.dispatcher = createDispatcher(this,this._onData);
    }
    _search=()=>{
        let {searchText} = this.state;
        if(!searchText){
           return dispatch(actions.TOAST,'请输入搜索内容');
        }
        this.dispatcher.dispatch(actions.SEARCH_BOOK,{searchText});
    }
    _onData({key,state}){
        // switch(key){
        //     case actions.SEARCH_BOOK:
        //         return true;
        // }
    }
    _renderItem({item}){
        return (
            <Item 
                count={item.count}
                name={item.name}
                classify={item.classify}/>
        );
    }
    _keyExtrator(item){
        return item.name+item.classify;
    }
    render(){
        return (
            <View
                style={styles.wrapper}>
                <Header
                    onSubmitEditing={this._search}
                    onChangeText={(v)=>this.state.searchText = v}/>
                <FlatList
                    renderItem={this._renderItem} 
                    keyExtractor={this._keyExtrator}
                    data={this.state.result}/>
            </View>
        );
    }
}

const styles = StyleSheet.create(function(theme){
    return {
        wrapper:{
            flex:1
        }
    }
});
export default SearchBook;