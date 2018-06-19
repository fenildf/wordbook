'use strict'
import React, { Component } from 'react';
import {
    View
} from 'react-native';

import Item from './../Item';
import StyleSheet from './../../../util/StyleSheet'
import FontIcon from '../FontIcon';
class IconItem extends Component {
    constructor(...props) {
        super(...props);
    }
    _onLayout = ({ nativeEvent }) => {
        let { width } = nativeEvent.layout;
        if (width !== this.state.width) {
            this.setState({ width });
        }
    }
    render() {
        let {
            onPress,
            onLongPress,
            style,
            children,
            iconName,
            iconColor
        } = this.props;
        return (
            <Item
                style={style}
                onLongPress={onLongPress}
                onPress={onPress} >
                {iconName?
                    <FontIcon 
                        name={iconName}
                        color={iconColor||'#D12A00'}
                        style={styles.icon}
                        />
                    :
                    null}
                {children}
            </Item>
        );
    }
}

const styles = StyleSheet.create(function(){
    return {
        icon:{
            marginRight:8
        }
    };
});
export default IconItem;