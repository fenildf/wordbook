'use strcit'
import React from 'react'

import {
    View
} from 'react-native';

import Text from './../../components/Text';
import SectionL from './../../components/Section';
import ScreenComponent from './../../components/ScreenComponent';
import ScrollView from './../../components/ScrollView';
import {createDispatcher} from 'react-febrest';
import {dispatch} from 'febrest';
import actions from '../../../constants/actions';

class Section extends ScreenComponent{
    constructor(...props){
        super(...props);
        let params = this.getScreen().getNavigation().state.params||{};
        let section = params.section||{}
        this.navigationOptions = {
            title:section.name||'单词本'
        }
        this.state = {
            words:[],
            section
        }
        this.dispatcher = createDispatcher(this,this._onData);
    }
    _onData(data){
    }

    componentDidMount() {
        let section = this.state.section
        this.dispatcher.dispatch(actions.WORD_GET_WORDS,{bookName:section.book_name,sectionName:section.name})
    }
    
    render(){
        return (
            <ScrollView >
                <SectionL 
                    onItemPress={item=>dispatch(actions.APP_NAVIGATE,{routeName:'Section',params:{section:item}})}
                    data={this.state.words}/>
            </ScrollView>
        )
    }
}


export default Section;