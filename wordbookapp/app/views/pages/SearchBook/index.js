'use strict'

import React,{Component} from 'react';

import {
    View
} from 'react-native';

import StyleSheet from 'react-native-theme-stylesheet';

import Header from './Header';
import actions from '../../../constants/actions';
import {dispatch} from 'febrest';
import FlatList from './../../components/FlatList';
import Empty from './../../components/Empty';

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
        }    }
    _search=()=>{
        let {searchText} = this.state;
        if(!searchText){
           return dispatch(actions.TOAST,'请输入搜索内容');
        }
        dispatch(actions.SEARCH_BOOK,{searchText}).then(({state})=>this.setState(state));
    }
    _add(item){
        dispatch(actions.USER_ADD_BOOKS,{[item.name]:item}).then(()=>dispatch(actions.TOAST,'添加成功'));
    }
    _renderItem=({item})=>{
        return (
            <Item 
                count={item.count}
                name={item.name}
                onPress={()=>this._add(item)}
                classify={item.classify}/>
        );
    }
    _keyExtrator(item){
        return item.name+item.classify;
    }
    render(){
        let {result,searchText} = this.state;
        return (
            <View
                style={styles.wrapper}>
                <Header
                    onSubmitEditing={this._search}
                    onChangeText={(v)=>this.state.searchText = v}/>
                {result&&searchText?<FlatList
                    renderItem={this._renderItem} 
                    ListEmptyComponent={<Empty text='抱歉，未能找到您想要的单词本。'/>}
                    keyExtractor={this._keyExtrator}
                    data={this.state.result}/>:null}
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