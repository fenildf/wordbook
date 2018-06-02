'use strcit'
import React from 'react'

import {
    View
} from 'react-native';

import Text from './../../components/Text';
import ScreenComponent from './../../components/ScreenComponent';
import ScrollView from './../../components/ScrollView';
import { createDispatcher } from 'react-febrest';
import { dispatch } from 'febrest';
import actions from '../../../constants/actions';
import Footer from './Footer';
import Main from './Main';
import StyleSheet from './../../../util/StyleSheet';

import Meaning from './Meaning';
class Word extends ScreenComponent {
    constructor(...props) {
        super(...props);
        let params = this.getScreen().getNavigation().state.params || {};
        let word = params.word || {}
        let words = params.words;
        this.navigationOptions = {
            title: ''
        }
        this.state = {
            words: words,
            word,
            meaning:null
        }
        this.dispatcher = createDispatcher(this, this._onData);
    }
    _onData(data) {
        
    }

    componentDidMount() {

    }
    _onRemember = () => {
        this._next();
    }
    _next() {
        let {
            word,
            meaning
        } = this.state;
        let index = word.index+1;
        let nWord = this.state.words[index];
        if (nWord) {
            this.setState({ word: nWord, meaning: null });
        }
    }
    _preview=()=>{
        let {
            word,
            meaning
        } = this.state;
        let index = word.index-1;
        let nWord = this.state.words[index];
        if (nWord) {
            this.setState({ word: nWord, meaning: null });
        }
    }
    _onForget = () => {
        this._next();
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
            backgroundColor: '#fff'
        }
    }
});

export default Word;