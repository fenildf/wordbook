'use strict'
import React from 'react';
import {
    View,
    ListView,
    SectionList,
    FlatList,
    TouchableOpacity,
    Text
}from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import {Theme} from 'react-native-improver';
import ProgressItem from './../../components/ProgressItem';
import {createDispatcher} from 'react-febrest';
import actions from '../../../constants/actions';
var currentTheme = Theme.getTheme();
class Main extends ScreenComponent{
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:'首页'
        }
        this.state = {
            books:[]
        }
        this.dispatcher = createDispatcher(this,this._onData);
    }
    _onData(data){
    }
    _renderItems(){
        return this.state.books.map(book=>{
            return (
                <ProgressItem
                    progress={0.7}
                    key={book.name}>
                    <Text>{book.name}</Text>
                </ProgressItem>
            )
        })
    }
    componentDidMount() {
        this.dispatcher.dispatch(actions.WORD_GET_BOOKS);
    }
    
    render(){
       return  (
        <View>
            {this._renderItems()}
        </View>
       
       )
    }
}
export default Main;