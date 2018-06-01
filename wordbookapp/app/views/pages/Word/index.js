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

class Word extends ScreenComponent{
    constructor(...props){
        super(...props);
        let params = this.getScreen().getNavigation().state.params||{};
        let word = params.section||{}
        this.navigationOptions = {
            title:word.name||'单词本'
        }
        this.state = {
            sections:[]
        }
        this.dispatcher = createDispatcher(this,this._onData);
    }
    _onData(){

    }

    componentDidMount() {
        
    }
    
    render(){
        return (
            <ScrollView >
                <SectionL 
                    onItemPress={item=>dispatch(actions.APP_NAVIGATE,{routeName:'Section',params:{section:item}})}
                    data={this.state.sections}/>
            </ScrollView>
        )
    }
}


export default Word;