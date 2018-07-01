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
import StyleSheet from './../../../util/StyleSheet';
import FontIcon from './../../components/FontIcon';
import Pages from './Pages';
import TouchableOpacity from '../../components/TouchableOpacity';
import Text from '../../components/Text';

import Header from './../../components/Header';
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
            header:null,
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
    
    render() {
        let {
            words,
            word
        } = this.state;
        return (
            <View
                style={styles.wrapper}>
                <Header 
                    style={styles.header}
                    rightButton={this._renderRightButton()}
                    leftButton={this._renderLeftButton()}
                    title={<View><Text style={styles.title}>{this.state.bookName}</Text></View>}/>
                <View
                    style={styles.wrapper}>
                    {words&&words.length>0&&<Pages 
                        style={styles.wrapper}
                        word={word}
                        dataSource={this.state.words}/>}
                </View>
                 <Footer
                        onRemember={this._onRemember}
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