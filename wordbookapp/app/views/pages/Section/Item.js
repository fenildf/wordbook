'use strict'

import React from 'react';

import Text from './../../components/Text';
import StyleSheet from 'react-native-theme-stylesheet';
import Row from './../../components/Item';
import SwipeRow from './../../components/SwipeRow'
function Item(props) {
    let {
        onPress,
        data,
        onLongPress
    } = props;

    return (
        <Row
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.button}>
            <Text
                style={styles.name}>
                {data.name}
            </Text>
        </Row>
    );
}


const styles = StyleSheet.create(function (theme) {
    return {
        button: {
            flexDirection: 'row',
            height: theme.itemHeightM,
            alignItems: 'center',
            backgroundColor: theme.backgroundColor,
            borderTopWidth: theme.px,
            borderTopColor: theme.borderColor,

        },
        main: {
            flexDirection: 'column',
            justifyContent: 'center',

        },
        name: {
            marginBottom: 4
        },
        position: {
            fontSize: theme.f1
        }
    }
});


export default Item;