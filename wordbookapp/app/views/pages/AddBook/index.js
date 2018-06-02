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
class AddBook extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '添加单词本',
        }
        this.state = {
            books: []
        }
        this.dispatcher = createDispatcher(this, this._onData);
    }
    _onData(data) {
    }

    componentDidMount() {
        this.dispatcher.dispatch(actions.WORD_GET_BOOKS);
    }
    _renderBooks(){
        let books = this.state.books;
        return books.map((book)=>{
            return (
                <SelectableItem
                    key={book.name}
                    name={book.name}
                    count={book.count}/>
            )
        });
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