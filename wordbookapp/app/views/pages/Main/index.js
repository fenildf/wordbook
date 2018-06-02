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
import SectionTitle from './../../components/SectionTitle';
import AddButton from './AddButton';
class Main extends ScreenComponent{
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:'我的单词本',
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
            <AddButton 
                onPress={this._addBook}/>
        </ScrollView>
       
       )
    }
    _addBook=()=>{
        this.dispatcher.dispatch(actions.APP_NAVIGATE,{routeName:'AddBook'});
    }
}
const styles = StyleSheet.create({
    wrapper:{
        flex:1
    }
})
export default Main;