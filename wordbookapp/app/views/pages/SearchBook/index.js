'use strict'

import React,{Component} from 'react';

import {
    View
} from 'react-native';

import StyleSheet from './../../../util/StyleSheet';

import Header from './Header';

class SearchBook extends Component{
    static routeConfig={
        name:'SearchBook'
    }
    constructor(...props){
        super(...props);
        this.navigationOptions={
            title:'搜索',
            header:null
        }
        this.state={

        }
    }
    render(){
        return (
            <View
                style={styles.wrapper}>
                <Header />
            </View>
        );
    }
}

const styles = StyleSheet.create(function(theme){
    return {
        wrapper:{
            flex:1
        }
    }
});
export default SearchBook;