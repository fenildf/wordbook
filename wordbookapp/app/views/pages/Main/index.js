'use strict'
import React,{Component} from 'react';
import {
    View,
    ListView,
    SectionList,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import ScrollView from './../../components/ScrollView';
import FontIcon from './../../components/FontIcon';
import { createDispatcher } from 'react-febrest';
import { dispatch } from 'febrest';
import actions from '../../../constants/actions';
import AddButton from './AddButton';
import BookItem from './BookItem';
class Main extends Component {
    static routeConfig = {
        name:'Main'
    }
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '单词本',
        }
        this.state = {
            books: []
        }
        this.dispatcher = createDispatcher(this, this._onData);
        this.dispatcher.watch(this._watch);
    }
    
    _onData(data) {
    }
    _watch=(changed)=> {
        if (changed.word) {
            this._getBooks();
        }
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
    _renderItems() {
        let books = this.state.books;
        return books.map((book) => {
            return (
                <BookItem
                    book={book}
                    onLongPress={()=>dispatch(actions.APP_NAVIGATE,{routeName:'BookManager'})}
                    onPress={()=>dispatch(actions.APP_NAVIGATE,{routeName:'Book',params:{book}})}
                    key={book.name} />
            );
        });
    }
    render() {
        return (
            <ScrollView
                style={styles.wrapper}>
                {this._renderItems()}
                <AddButton
                    onPress={this._addBook} />
            </ScrollView>

        )
    }
    _addBook = () => {
        this.dispatcher.dispatch(actions.APP_NAVIGATE, { routeName: 'AddBook' });
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    }
})
export default Main;