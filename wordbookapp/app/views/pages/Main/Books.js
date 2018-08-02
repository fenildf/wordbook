'use strict'
import React,{Component} from 'react';
import {View} from 'react-native';

import StyleSheet from './../../../util/StyleSheet';
import Text from './../../components/Text';
import { createDispatcher } from 'react-febrest';
import { dispatch } from 'febrest';
import actions from '../../../constants/actions';
import FlatList from './../../components/FlatList';
import BookItem from './BookItem';

import TouchableOpacity from './../../components/TouchableOpacity'; 
import Search from './Search';

function More(){
    return (
        <TouchableOpacity
            onPress={()=>dispatch(actions.APP_NAVIGATE, { routeName: 'AddBook' })}
            style={styles.more}>
            <Text
                style={styles.text}>
                更多
            </Text>
        </TouchableOpacity>
    )
}

class Books extends Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
        this.dispatcher = createDispatcher(this, this._onData);
        this.dispatcher.watch(this._watch);
    }
    componentDidMount() {
        this._getBooks();
    }
    componentWillUnmount() {
        this.dispatcher.release();
    }
    _getBooks() {
        this.dispatcher.dispatch(actions.USER_GET_BOOKS);
    }
    _watch=(changed)=> {
        if (changed.word) {
            this._getBooks();
        }
    }
    _renderItem=({item,index})=>{
        return (
            <BookItem
                book={item}
                style={index===0&&{borderTopWidth:0} }
                onLongPress={()=>dispatch(actions.APP_NAVIGATE,{routeName:'BookManager'})}
                onPress={()=>dispatch(actions.APP_NAVIGATE,{routeName:'Book',params:{item}})}/>
        );
    }
    _keyExtractor=(item)=>{
        return item.name;
    }
    render(){
        return (
            <View
                style={styles.wrapper}>
                <View
                    style={styles.header}>
                    <Search
                        onPress={()=>dispatch(actions.APP_NAVIGATE,{routeName:'SearchBook'})}/>
                    <More />
                </View>
                <FlatList 
                    data={this.state.books}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}/>
            </View>
            
        )
    }
}

const styles = StyleSheet.create(theme=>{
    return {
        wrapper:{
            paddingTop:theme.navigationHeaderPaddingTop,
            flex:1,
            backgroundColor:'#fff'
        },
        header:{
            flexDirection:'row'
        },
        more:{
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:theme.paddingHorizontal
        }
    }
})
export default Books;