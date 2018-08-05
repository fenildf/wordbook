
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

function More(){
    return (
        <TouchableOpacity
            onPress={()=>dispatch(actions.APP_NAVIGATE, { routeName: 'AddBook' })}
            style={styles.more}>
            <Text
                style={styles.text}>
                添加
            </Text>
        </TouchableOpacity>
    )
}

class WordBook extends Component {
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
        this.dispatcher.dispatch(actions.APP_WORD_BOOK);
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
                onPress={()=>dispatch(actions.APP_NAVIGATE,{routeName:'Book',params:{book:item}})}/>
        );
    }
    _keyExtractor=(item)=>{
        return item.name;
    }
    render(){
        let items;
        try{
            items = this.state.data.items;
        }catch(e){

        }
        return (
            <View
                style={styles.wrapper}>
                <View
                    style={styles.header}>
                    <View style={{flex:1}}/>
                    <More />
                </View>
                <FlatList 
                    data={items}
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
            flexDirection:'row',
            height:40
        },
        more:{
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:theme.paddingHorizontal,
        }
    }
})
export default WordBook;