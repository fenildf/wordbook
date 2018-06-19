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
import Button from './Button';

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
        this._selectedBooks = {};
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
    _onSelected(isSelected,book){
        if (isSelected) {
            this._selectedBooks[book.name] = book;
        } else {
            delete this._selectedBooks[book.name];
        }
    }
    _renderItems(){
        let {books} = this.state;
        if(!books){
            return null;
        }
        return books.map(book=>{
            return (
                <Item 
                    onSelected={(isSelected)=>this._onSelected(isSelected,book)}
                    key={book.name}
                    book={book}/>
            );
        });
    }
    _deleteBooks=()=>{
        dispatch(actions.USER_REMOVE_BOOKS,this._selectedBooks);
        dispatch(actions.APP_NAVIGATE_GOBACK);
        
    }
    render(){
        return (
            <View 
                style={styles.wrapper}>
                <ScrollView
                    style={styles.wrapper}>
                    {this._renderItems()}
                </ScrollView>
                <Button 
                    onPress={this._deleteBooks}/>
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