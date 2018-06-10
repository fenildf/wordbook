'use strcit'
import React from 'react'

import {
    View
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import FlatList from './../../components/FlatList';
import {createDispatcher} from 'react-febrest';
import {dispatch} from 'febrest';
import actions from '../../../constants/actions';
import Item from './Item';
import StyleSheet from './../../../util/StyleSheet';


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
        this.dispatcher.dispatch(actions.WORD_GET_WORDS,{bookName:section.bookName,sectionName:section.name})
    }
    _renderItem=({item,index})=>{
        let {section} = this.state;
        return (
            <Item 
                onPress={()=>dispatch(actions.APP_NAVIGATE,{routeName:'Word',params:{bookName:section.bookName,sectionName:section.name,word:item}})}
                data={item}/>
        )
    }
    _keyExtractor=(item)=>{
        return (item.id||item.name)+'';
    }
    render(){
        return (
            <FlatList 
                ref='List'
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                getItemLayout={(data, index) => (
                    {length: 48, offset: 48 * index, index}
                )}
                style={styles.wrapper}
                data={this.state.words} />
        )
    }
}

const styles = StyleSheet.create(function(theme){
    return {
        wrapper:{
            flex:1,
            backgroundColor:'#fff'
        }
    }
});
export default Section;