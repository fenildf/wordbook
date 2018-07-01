'use strict'
import React,{Component} from 'react';

import {
    View
} from 'react-native';

import { createDispatcher } from 'react-febrest';
import { dispatch } from 'febrest';
import actions from '../../../constants/actions';
import Footer from './Footer';
import Main from './Main';
import Meaning from './Meaning';

import StyleSheet from './../../../util/StyleSheet';

class Page extends Component{
    constructor(...props){
        super(...props);
        this.state={}
        this.dispatcher = createDispatcher(this);
    }
    setData(){

    }
    _onForget = () => {
        this._next();
        this._mark(this.props.word,false);
    }
    _onShowMeaning = () => {
        let {word}=this.props;
        let {
            meaning
        } = this.state;
        if(meaning){
            return;
        }
        this.dispatcher.dispatch(actions.WORD_GET_MEANING,word.name);
    }
    _onRemember = () => {
        this._next();
        this._mark(this.props.word,true);
    }
    _findWordIndex(word,words){
        let i=0,l =words.length;
        while(word.name !== words[i].name && i<l){
            i++;
        }
        return i;
    }
    _next() {
        this.props.onNext && this.props.onNext();
    }
    _mark(word,isRemember){
        dispatch(actions.USER_MARK_WORD,{
            bookName:this.props.word.book_name,
            isRemember,
            word
        });
    }
    render(){
        let {word} = this.props;
        let {meaning} = this.state;
        return (
            <View
                style={styles.wrapper}>
                 <Main
                    onShowMeaning={this._onShowMeaning}
                    word={word} />
                    <Meaning
                        meaning={meaning} />
            </View>
        );
    }
}

const styles = StyleSheet.create(function(theme){
    return {
        wrapper:{
            flex:1,
        }
    }
});
export default Page;