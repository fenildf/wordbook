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
import BookSection from './BookSection';
import NavigationManager from './../../../util/NavigationManager';

import FoldableItem from './../../components/FoldableItem';

class AddBook extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '添加单词本',
            rightButton:this._renderRightButton(),
            onRightButtonPress:this._onRightButtonPress
        }
        this.state = {
            classify: []
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
        this.dispatcher.dispatch(actions.WORD_GET_CLASSIFY);
    }
    _selectedItem=(isSelected,book)=>{
        if(isSelected){
            this._selectedBooks[book.name] = book;
        }else{
            delete this._selectedBooks[book.name];
        }
    }
    _renderBooks(){
        let classify = this.state.classify;
        return classify.map((item,index)=>{
            return (
                <FoldableItem
                    key={item.name}
                    itemStyle={[styles.itemStyle,styles.borderTop]}
                    title={item.name}>
                    {BookSection(item.children,this._selectedItem)}
                </FoldableItem>
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
        },
        borderTop:{
            borderBottomWidth:theme.px,
            borderBottomColor:theme.borderColor,
            borderTopWidth:theme.px,
            borderTopColor:theme.borderColor
        },
        itemStyle:{
            backgroundColor:'#fff',
            paddingLeft:theme.paddingHorizontal
        }
    }
})
export default AddBook;