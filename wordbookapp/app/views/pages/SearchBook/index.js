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
    _search(){
        let {searchText} = this.state;
        if(!searchText){
           return dispatch(actions.TOAST,'请输入搜索内容');
        }
        this.dispatcher.dispatch(actions.SEARCH_BOOK,{searchText});
    }
    _onData(){

    }
    render(){
        return (
            <View
                style={styles.wrapper}>
                <Header
                    onSubmitEditing={()=>this._search}
                    onChangeText={(v)=>this.state.searchText = v}/>
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