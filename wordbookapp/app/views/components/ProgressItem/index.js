'use strict'
import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import Item from './../Item';
class ProgressItem extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            width: 0
        }
    }
    _onLayout = ({ nativeEvent }) => {
        let { width } = nativeEvent.layouts;
        if (width !== this.state.width) {
            this.setState({ width });
        }
    }
    render() {
        let {
            progress,
            onPress,
            style,
            children
        } = this.props;
        return (
            <Item
                style={style}
                onLayout={this._onLayout}
                onPress={onPress} >
                <View
                    style={[styles.background, { width: this.state.width }]}
                    />
                {children}
            </Item>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor:'#ff534d',
        position:'absolute',
        bottom:0,
        top:0
    }
})
export default ProgressItem;