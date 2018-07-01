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
    _fetchData(){
        let {
            bookName,
            sectionName
        } = this.state;
        this.dispatcher.dispatch(actions.WORD_GET_WORDS,{bookName,sectionName});
    }
    
    render() {
        let {
            words
        } = this.state;
        return (
            <View
                style={styles.wrapper}>
                <Pages 
                    style={styles.wrapper}
                    dataSource={this.state.words}/>
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
        icon:{
            color:theme.rightButtonColor
        }
    }
});

export default Word;