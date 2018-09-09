'use strcit'
import React,{Component} from 'react'

import {
    View
} from 'react-native';

import FlatList from './../../components/FlatList';
import {createDispatcher} from 'react-febrest';
import {dispatch} from 'febrest';
import actions from '../../../constants/actions';
import Item from './Item';
import StyleSheet from 'react-native-theme-stylesheet';


class Section extends Component{
    static routeConfig={
        name:'Section'
    }
    constructor(...props){
        super(...props);
        let params = this.props.navigation.state.params||{};
        let section = params.section||{}
        this.navigationOptions = {
            title:section.name||'单词本'
        }
        this.state = {
            words:[],
            section
        }
        this.dispatcher = createDispatcher(this,this._onData);
        this.dispatcher.watch(this._onProviderChange)
    }
    _onData(data){
    }
    _onProviderChange=(change)=>{
        if(change.word){
            let section = this.state.section
            this.dispatcher.dispatch(actions.WORD_GET_WORDS,{bookName:section.bookName,sectionName:section.name})
        }
    }
    componentDidMount() {
        let section = this.state.section
        this.dispatcher.dispatch(actions.WORD_GET_WORDS,{bookName:section.bookName,sectionName:section.name})
    }
    componentWillUnmount(){
        this.dispatcher.release();
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
                style={styles.wrapper}
                data={this.state.words} />
        )
    }
}

const styles = StyleSheet.create(function(theme){
    return {
        wrapper:{
            flex:1,
            backgroundColor:theme.backgroundColor,
        }
    }
});
export default Section;