'use strcit'
import React,{Component} from 'react'

import {
    View
} from 'react-native';

import Text from './../../components/Text';
import ScrollView from './../../components/ScrollView';
import { createDispatcher } from 'react-febrest';
import { dispatch } from 'febrest';
import actions from '../../../constants/actions';
import Footer from './Footer';
import Main from './Main';
import StyleSheet from './../../../util/StyleSheet';
import FontIcon from './../../components/FontIcon';

import Meaning from './Meaning';
class Word extends Component {
    static routeConfig = {
        name:'Word'
    }
    constructor(...props) {
        super(...props);
        let params = this.props.navigation.state.params || {};
        let word = params.word || {}
        let sectionName = params.sectionName;
        let bookName = params.bookName;
        this.navigationOptions = {
            title: bookName,
            rightButton:this._renderRightButton(),
            onRightButtonPress:this._onRightButtonPress
        }
        this.state = {
            words: [],
            word,
            sectionName,
            bookName,
            meaning:null
        }
        this.dispatcher = createDispatcher(this, this._onData);
        // this.dispatcher.watch(this._onProviderChange)
    }
    _renderRightButton(){
        return <FontIcon style={styles.icon} name='ios-sunny-outline'/>
    }
    _onRightButtonPress=()=>{
        dispatch(actions.SET_WORD_PAGE_THEME)
    }
    _onData(data) {
        switch(data.key){
            case actions.USER_MARK_WORD:
                return true;
            case actions.SET_WORD_PAGE_THEME:
                this.setState(data.state);
                return true;
        }
    }
    _onProviderChange=(change)=>{
        if(change.word){
            this._fetchData();
        }
    }
    componentWillUnmount(){
        this.dispatcher.release();
    }
    componentDidMount() {
        this._fetchData();
    }
    _onRemember = () => {
        this._next();
        this._mark(this.state.word,true);
    }
    _fetchData(){
        let {
            bookName,
            sectionName
        } = this.state;
        this.dispatcher.dispatch(actions.WORD_GET_WORDS,{bookName,sectionName});
    }
    _findWordIndex(word,words){
        let i=0,l =words.length;
        while(word.name !== words[i].name && i<l){
            i++;
        }
        return i;
    }
    _next() {
        let {
            word,
            meaning,
            words
        } = this.state;
        let index = this._findWordIndex(word,words);
        let nWord = words[index+1];
        if (nWord) {
            this.setState({ word: nWord, meaning: null });
        }else{
            this.getScreen().toast('当前已经是最后一个');
        }
    }
    _mark(word,isRemember){
        this.dispatcher.dispatch(actions.USER_MARK_WORD,{
            bookName:this.state.bookName,
            isRemember,
            word
        });
    }
    _preview=()=>{
        let {
            word,
            meaning,
            words
        } = this.state;
        let index = this._findWordIndex(word,words);
        let nWord = words[index-1];
        if (nWord) {
            this.setState({ word: nWord, meaning: null });
        }else{
            this.getScreen().toast('当前已经是第一个');
        }
    }
    _onForget = () => {
        this._next();
        this._mark(this.state.word,false);
    }
    _onShowMeaning = () => {
        let {
            word,
            meaning
        } = this.state;
        if(meaning){
            return;
        }
        this.dispatcher.dispatch(actions.WORD_GET_MEANING,word.name);
    }
    render() {
        let {
            word,
            meaning
        } = this.state;
        return (
            <View
                style={styles.wrapper}>
                <Main
                    onShowMeaning={this._onShowMeaning}
                    word={word} />
                <Meaning
                    meaning={meaning} />
                <Footer
                    onRemember={this._onRemember}
                    onPreview={this._preview}
                    onForget={this._onForget}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create(function (theme) {
    return {
        wrapper: {
            flex: 1,
            backgroundColor: theme.wordPageBackgroundColor,
        },
        icon:{
            color:theme.rightButtonColor
        }
    }
});

export default Word;