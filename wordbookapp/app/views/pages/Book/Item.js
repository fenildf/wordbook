'use strict'

import React from 'react';

import FontIcon from './../../components/FontIcon';
import Text from './../../components/Text';
import { View } from 'react-native';
import TouchableOpacity from './../../components/TouchableOpacity';
import StyleSheet from './../../../util/StyleSheet';
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
                {data.name||data.section_name}
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
            backgroundColor: '#fff',
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