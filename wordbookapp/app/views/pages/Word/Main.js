'use strict'

import React from 'react';

import FontIcon from './../../components/FontIcon';
import Text from './../../components/Text';
import { View } from 'react-native';
import TouchableOpacity from './../../components/TouchableOpacity';
import StyleSheet from './../../../util/StyleSheet';
import IconItem from './../../components/IconItem';
import Voice from './../../components/Voice';

function Main(props) {
    let {
        word,
        meaning={}
    } = props;

    let s = meaning.s||{};
    return (
        <View
            style={styles.wrapper}>
            <Text
                style={styles.name}>{word.name}</Text>
            <Text
                style={[styles.textColor,styles.marginLeft]}>
                英
            </Text>
            {s.enVoice ? <Voice style={[styles.voice, styles.marginLeft]} voice={s.enVoice} /> : null}
            <Text style={[styles.marginLeft, styles.textColor]}>[{s.en}]</Text>
            <Text style={[styles.marginLeft, styles.textColor]}>
                美
            </Text>
            {s.amVoice ? <Voice style={[styles.voice, styles.marginLeft]} voice={s.amVoice} /> : null}
            <Text style={[styles.marginLeft, styles.textColor]}>[{s.am}]</Text>
        </View>
    );
}


const styles = StyleSheet.create(function (theme) {
    return {
        wrapper: {
            justifyContent: 'space-between',
            alignItems: 'center',
            height: theme.itemHeightM,
            flexDirection: 'row',
            paddingHorizontal: theme.paddingHorizontal
        },
        name: {
            color: theme.wordPageColor
        },
        color: {
            color: '#b8879c'
        },
        voice: {
            backgroundColor:theme.wordPageBackgroundColor,
            height: 18,
            width: 20
        },
        marginLeft: {
            marginLeft: 4
        },
        textColor:{
            color:theme.wordPageColor
        },
    }
});


export default Main;