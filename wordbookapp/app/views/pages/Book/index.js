'use strcit'
import React from 'react'

import {
    View
} from 'react-native';

import Text from './../../components/Text';
import Section from './../../components/Section';
import ScreenComponent from './../../components/ScreenComponent';
import ScrollView from './../../components/ScrollView';
import {createDispatcher} from 'react-febrest';
import {dispatch} from 'febrest';
import actions from '../../../constants/actions';
class Book extends ScreenComponent{
    constructor(...props){
        super(...props);
        let params = this.getScreen().getNavigation().state.params||{};
        let book = params.book||{}
        this.navigationOptions = {
            title:book.name||'单词本'
        }
        this.state = {
            sections:[],
            book
        }
        this.dispatcher = createDispatcher(this,this._onData);
    }
    _onData(){

    }

    componentDidMount() {
        this.dispatcher.dispatch(actions.WORD_GET_SECTIONS,{bookName:this.state.book.name})
    }
    
    render(){
        return (
            <ScrollView >
                <Section 
                    onItemPress={item=>dispatch(actions.APP_NAVIGATE,{routeName:'Section',params:{section:item}})}
                    data={this.state.sections}/>
            </ScrollView>
        )
    }
}


export default Book;