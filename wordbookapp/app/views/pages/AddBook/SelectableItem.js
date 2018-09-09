'use strict'
import Text from './../../components/Text';

import React from 'react';
import StyleSheet from 'react-native-theme-stylesheet';
import RadioItem from './../../components/RadioItem';

function SelectableItem({onSelected,name,count}) {
    return (
        <RadioItem
            style={styles.row}
            onSelected={onSelected}>
            <Text style={styles.name}>{name} ({count})</Text>
        </RadioItem>
    );
}
const styles = StyleSheet.create(function (theme) {
    return {
        row: {
            flexDirection: 'row',
            height: theme.itemHeightM,
            alignItems: 'center',
            backgroundColor:theme.backgroundColor,
            borderTopWidth: theme.px,
            borderTopColor: theme.borderColor,
        },
        name: {
            marginLeft: 8
        }
    }
});

export default SelectableItem;