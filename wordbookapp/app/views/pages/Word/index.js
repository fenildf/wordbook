'use strcit'
import React,{Component} from 'react'

import {
    View
} from 'react-native';
import { createDispatcher } from 'react-febrest';
import { dispatch } from 'febrest';
import actions from '../../../constants/actions';
import Footer from './Footer';
import Main from './Main';
import StyleSheet from 'react-native-theme-stylesheet';
import FontIcon from './../../components/FontIcon';
import Pages from './Pages';
import TouchableOpacity from '../../components/TouchableOpacity';
import Text from '../../components/Text';
import Title from './Title';

import Header from './../../components/Header';
import Translate from './Translate';


const PAGES_REF = 'PAGES_REF';
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
            header:null,
        }
        this.state = {
            words: [],
            word,
            sectionName,
            bookName,
            autoTranslate:false,
            meaning:null
        }
        this.dispatcher = createDispatcher(this, this._onData);
        // this.dispatcher.watch(this._onProviderChange)
    }
    _renderRightButton(){
        return <TouchableOpacity 
                    onPress={this._onRightButtonPress}
                    children={ <FontIcon style={styles.icon} name='ios-sunny-outline'/>}/>
    }
    _renderLeftButton(){
        return <TouchableOpacity 
                    onPress={()=>dispatch(actions.APP_NAVIGATE_GOBACK)}
                    children={ <FontIcon style={styles.backArrow} name='ios-arrow-round-back-outline'/>}/>
    }
    _onRightButtonPress=()=>{
        dispatch(actions.SET_WORD_PAGE_THEME)
    }
    _onData({state,key}) {
        switch(key){
            case actions.USER_MARK_WORD:
                return true;
            case actions.SET_WORD_PAGE_THEME:
                this.setState(state);
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
    _fetchData(){
        let {
            bookName,
            sectionName
        } = this.state;
        this.dispatcher.dispatch(actions.WORD_GET_WORDS,{bookName,sectionName});
    }
    _onAutoTranslate=()=>{
        let {autoTranslate} = this.state;
        this.dispatcher.dispatch(actions.SET_AUTO_TRANSLATE,!autoTranslate);
    }
    _onForget = () => {
        this._next();
        this._mark(this.state.word,false);
    }
    _onRemember = () => {
        this._next();
        this._mark(this.state.word,true);
    }
    _next() {
        this.refs[PAGES_REF] && this.refs[PAGES_REF].next();
    }
    _onWordSelected=(word)=>{
        this.state.word = word;
        // this._titleRef.setTitle(word.name);
    }
    _mark(word,isRemember){
        dispatch(actions.USER_MARK_WORD,{
            bookName:this.state.bookName,
            isRemember,
            word
        });
    }
    _translate=()=>{
        this.refs[PAGES_REF] && this.refs[PAGES_REF].translate();
    }
    render() {
        let {
            words,
            word,
            autoTranslate,
            sectionName
        } = this.state;
        return (
            <View
                style={styles.wrapper}>
                <Header 
                    style={styles.header}
                    rightButton={this._renderRightButton()}
                    leftButton={this._renderLeftButton()}
                    title={<Title 
                            titleStyle={styles.title}
                            ref={(v)=>this._titleRef = v} 
                            defaultTitle={sectionName}/>}/>
                <View
                    style={styles.wrapper}>
                    {words&&words.length>0&&<Pages 
                        ref={PAGES_REF}
                        style={styles.wrapper}
                        word={word}
                        autoTranslate={autoTranslate}
                        onWordSelected={this._onWordSelected}
                        dataSource={this.state.words}/>}
                </View>
                 <Footer
                    autoTranslate={autoTranslate}
                    onAutoTranslate={this._onAutoTranslate}
                    onRemember={this._onRemember}
                    onForget={this._onForget}
                    />
                <Translate
                    onPress={this._translate} />
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
        header:{
            backgroundColor: theme.wordPageNavigationHeaderBackgroundColor,
        },
        title:{
            fontSize:theme.navigationHeaderFontSize,
            color:theme.wordPageNavigationHeaderColor
        },
        backArrow:{
            color:theme.wordPageNavigationHeaderColor
        },
        icon:{
            color:theme.rightButtonColor
        }
    }
});

export default Word;