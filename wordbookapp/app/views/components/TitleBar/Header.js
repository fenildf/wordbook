'use strict'
import React,{Component} from 'react';
import FlatList from './../FlatList';
import Title from './Title';
import {View} from 'react-native';

const FLATLIST_REF = 'FLATLIST_REF';
class Header extends Component{
    constructor(...props){
        super(...props);
    }
    scrollToIndex(index){
        this.refs[FLATLIST_REF].scrollToIndex({index});
    }
    _onItemClick=(item)=>{
        this.props.onItemClick && this.props.onItemClick(item)
    }
    _renderItem=({item})=>{
        return (
            <Title 
                onClick={this._onItemClick}
                item={item}/>
        )
    }
    _keyExtractor=(item)=>{
        return item.title;
    }
    render(){
        return (
            <View
                style={this.props.style}>
                <FlatList 
                    ref={FLATLIST_REF}
                    data={this.props.data}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    getItemLayout={this._getItemLayout}
                    horizontal={true}
                    />
            </View>
            
        );
    }
}


export default Header;