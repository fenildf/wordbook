'use strcit'
import React,{Component} from 'react'

import {
    View,
    InteractionManager
} from 'react-native';


import {createDispatcher} from 'react-febrest';
import {dispatch} from 'febrest';
import actions from '../../../constants/actions';
import FlatList from './../../components/FlatList';
import Item from './Item';
import StyleSheet from './../../../util/StyleSheet';
class Book extends Component{
    static routeConfig = {
        name:'Book'
    }
    constructor(...props){
        super(...props);
        let params =  this.props.navigation.state.params||{};
        let book = params.book||{}
        this.navigationOptions = {
            title:book.name||'单词本'
        }
        this.state = {
            sections:[],
            book
        }
        this.dispatcher = createDispatcher(this,this._onData);
        this.dispatcher.watch(this._onProviderChange)

    }
    componentDidUpdate(){
        // InteractionManager.runAfterInteractions(()=>{
        //     this.refs.List.scrollToIndex({index:300,animated:true})
        // });
    }
    componentWillUnmount(){
        this.dispatcher.release();
    }
    componentDidMount() {
        this._getWords();
    }
    _onProviderChange=(change)=>{
        if(change.word){
            this._getWords();
        }
    }
    _getWords(){
        let {name,classify} = this.state.book
        this.dispatcher.dispatch(actions.WORD_GET_SECTIONS,{bookName:name,classify})
    }
    _renderItem=({item,index})=>{
        let {book:{name}} = this.state;
        return (
            <Item 
                onPress={()=>dispatch(actions.APP_NAVIGATE,{routeName:'Section',params:{bookName:name,section:item}})}
                data={item}/>
        )
    }
    _keyExtractor=(item)=>{
        return (item.id||item.name||item.section_name)+'';
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
                data={this.state.sections} />
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

export default Book;