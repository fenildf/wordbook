'use strict'
import React, { Component } from 'react';

import {
    View
} from 'react-native';
import StyleSheet from 'react-native-theme-stylesheet';

class ContextMenu extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            display: 'none'
        }
    }
    //不要传
    hide(top, left, right, bottom ) {
        this.setState({ display: 'none', top, left, right, bottom })
    }
    show({ top, left, right, bottom }) {
        this.setState({ top, left, right, bottom, display: 'block' })
    }
    render() {
        let {
            style,
            children
        } = this.props;
        let { display, top, left, right, bottom } = this.state;
        if (display === 'none') {
            return null;
        }
        return (
            <View
                style={[
                    styles.contextMenu,
                    style,
                    {
                        top,
                        left,
                        right,
                        bottom
                    }
                ]}>
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create(function (theme) {
    return {
        contextMenu: {
            backgroundColor: '#e0e0e2',
            borderRadius: 5,
            position: 'absolute'
        }
    }
})

export default ContextMenu;