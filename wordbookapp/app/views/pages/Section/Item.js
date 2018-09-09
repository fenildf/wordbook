'use strict'

import React from 'react';

import Text from './../../components/Text';
import StyleSheet from 'react-native-theme-stylesheet';
import Row from './../../components/Item';
function Item(props) {
    let {
        onPress,
        data
    } = props;

    return (
        <Row
            onPress={onPress}
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