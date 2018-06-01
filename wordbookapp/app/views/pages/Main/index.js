'use strict'
import React from 'react';
import {
    View,
    ListView,
    SectionList,
    FlatList,
    TouchableOpacity,
    StyleSheet
}from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import ScrollView from './../../components/ScrollView';
import ProgressItem from './../../components/ProgressItem';
import {createDispatcher} from 'react-febrest';
import {dispatch} from 'febrest';

import actions from '../../../constants/actions';
import Text from './../../components/Text';
import Section  from './Section';
class Main extends ScreenComponent{
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:'首页'
        }
        this.state = {
            books:[]
        }
        this.dispatcher = createDispatcher(this,this._onData);
    }
    _onData(data){
    }
 
    componentDidMount() {
        this.dispatcher.dispatch(actions.WORD_GET_BOOKS);
    }
    
    render(){
       return  (
        <ScrollView
            style={styles.wrapper}>
            <Section 
                data={this.state.books}
                onItemPress={(item)=>dispatch(actions.APP_NAVIGATE,{routeName:'Book',params:{book:item}})}
                title='单词本'/>

        </ScrollView>
       
       )
    }
}
const styles = StyleSheet.create({
    wrapper:{
        flex:1
    }
})
export default Main;