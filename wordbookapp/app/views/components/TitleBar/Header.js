'use strict'
import React, { Component } from 'react';
import FlatList from './../FlatList';
import Title from './Title';
import { View } from 'react-native';

const FLATLIST_REF = 'FLATLIST_REF';
class Header extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            selected: 0
        }
    }
    setHeader(selected) {
        this.setState({ selected });
        if(selected>3){
            this.scrollToIndex(selected-3)
        }
    }
    scrollToIndex(index) {
        this.refs[FLATLIST_REF].scrollToIndex({ index, animated: false });
    }
    _onItemClick = (item) => {
        this.props.onItemClick && this.props.onItemClick(item)
    }
    _renderItem = ({ item, index }) => {
        let { selected } = this.state;
        return (
            <Title
                onClick={this._onItemClick}
                selected={index == selected}
                index={index}
                item={item} />
        )
    }
    _keyExtractor = (item) => {
        return item.title;
    }
    render() {
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
                    getItemLayout={(data, index) => (
                        { length: Title.WIDTH, offset: Title.WIDTH * index, index }
                    )}
                />
            </View>

        );
    }
}


export default Header;