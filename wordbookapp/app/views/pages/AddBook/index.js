'use strict'
import React from 'react';
import {
    View,
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import ScrollView from './../../components/ScrollView';
import { createDispatcher } from 'react-febrest';
import { dispatch } from 'febrest';
import StyleSheet from './../../../util/StyleSheet';

import actions from '../../../constants/actions';
import Text from './../../components/Text';
import SelectableItem from './SelectableItem';
import NavigationManager from './../../../util/NavigationManager';
class AddBook extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '添加单词本',
            rightButton:this._renderRightButton(),
            onRightButtonPress:this._onRightButtonPress
        }
        this.state = {
            books: []
        }
        this._selectedBooks = {

        }
        this.dispatcher = createDispatcher(this, this._onData);
    }
    _onData(data) {
    }
    _onRightButtonPress=()=>{
        dispatch(actions.USER_ADD_BOOKS,this._selectedBooks);
        NavigationManager.goBack();
    }
    componentDidMount() {
        this.dispatcher.dispatch(actions.WORD_GET_BOOKS);
    }
    _selectedItem=(isSelected,book)=>{
        if(isSelected){
            this._selectedBooks[book.name] = book;
        }else{
            delete this._selectedBooks[book.name];
        }
    }
    _renderBooks(){
        let books = this.state.books;
        return books.map((book)=>{
            return (
                <SelectableItem
                    onSelected={(isSelected)=>this._selectedItem(isSelected,book)}
                    key={book.name}
                    name={book.name}
                    count={book.count}/>
            )
        });
    } 
    _renderRightButton(){
        return (
            <Text>添加</Text>
        )
    }  
    render() {
        return (
            <ScrollView
                style={styles.wrapper}>
                {this._renderBooks()}
            </ScrollView>

        )
    }
}
const styles = StyleSheet.create(function (theme) {
    return {
        wrapper: {
            flex: 1
        }
    }
})
export default AddBook;