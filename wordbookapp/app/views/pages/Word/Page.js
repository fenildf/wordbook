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
        this.dispatcher = createDispatcher(this,this._onData);
    }
    componentWillUnmount(){
        this.dispatcher.release();
    }
    _onData({state,key}){
        switch(key){
            case actions.WORD_GET_MEANING:
                this.props.word.meaning = state.meaning;
                return false;
            case actions.SET_WORD_PAGE_THEME:
                this.setState({theme:state.wordPageTheme});
                return true;
        }
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
        if(word.meaning){
            return this.setState({meaning:word.meaning});
        }
        this.dispatcher.dispatch(actions.WORD_GET_MEANING,word.name);
    }
    _onRemember = () => {
        this._next();
        this._mark(this.props.word,true);
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
                    theme={this.state.theme}
                    onShowMeaning={this._onShowMeaning}
                    word={word} />
                <Meaning
                    theme={this.state.theme}
                    meaning={meaning} />
            </View>
        );
    }
}

const styles = StyleSheet.create(function(theme){
    return {
        wrapper:{
            flex:1,
        },
        theme:{
            backgroundColor:theme.wordPageBackgroundColor
        }
    }
});
export default Page;