'use strict'
import React,{Component}from 'react'

import {
    View,
} from 'react-native';


import {createDispatcher} from 'react-febrest';
import {dispatch} from 'febrest';
import ScrollView from './../../components/ScrollView';
import actions from '../../../constants/actions';
import StyleSheet from './../../../util/StyleSheet';
import Item from './Item';

class BookManager extends Component{
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:'管理我的单词本'
        }
        this.state = {
            books:[]
        }
        this.dispatcher = createDispatcher(this);
    }
    componentDidMount() {
        this._fetchData();
    }
    componentWillUnmount(){
        this.dispatcher.release();
    }
    _fetchData(){
        this.dispatcher.dispatch(actions.USER_GET_CUSTOMIZED_BOOKS);
    }
    _renderItems(){
        let {books} = this.state;
        if(!books){
            return null;
        }
        return books.map(book=>{
            return (
                <Item 
                    key={book.name}
                    book={book}/>
            );
        });
    }
    render(){
        return (
            <View 
                style={styles.wrapper}>
                <ScrollView
                    style={styles.wrapper}>
                    {this._renderItems()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create(function(theme){
    return {
        wrapper:{
            flex:1
        }
    };
})
export default BookManager;