'use strict'

import React, { Component } from 'react';

import FontIcon from './../../components/FontIcon';
import Text from './../../components/Text';
import { View } from 'react-native';
import TouchableOpacity from './../../components/TouchableOpacity';
import StyleSheet from 'react-native-theme-stylesheet';
import IconItem from './../../components/IconItem';
import Voice from './../../components/Voice';

class Main extends Component {
    constructor(...props) {
        super(...props);
    }
    _play = () => {
        if (this._enVoice) {
            this._enVoice.play().then(() => {
                this._amVoice && this._amVoice.play()
            })
        } else {
            this._amVoice && this._amVoice.play()
        }
    }
    render() {
        let {
            word,
            meaning = {}
        } = this.props;

        let s = meaning.s || {};
        return (
            <View
                style={styles.wrapper}>
                <TouchableOpacity
                    style={[styles.row, { borderTopWidth: 0 }]}
                    onPress={this._play}>
                    <Text
                        style={styles.name}>{word.name}</Text>
                </TouchableOpacity>
                {s.en && <Voice
                    iconStyle={[styles.voice]}
                    ref={(v) => this._enVoice = v}
                    style={styles.row}
                    voice={s.enVoice}>
                    <Text
                        syle={[styles.textColor]}>
                        英 [{s.en}]
                    </Text>
                </Voice> || null}
                {s.am && <Voice
                    style={styles.row}
                    ref={(v) => this._amVoice = v}
                    iconStyle={[styles.voice]}
                    voice={s.amVoice}>
                    <Text
                        style={[styles.textColor]}>
                        美 [{s.am}]
                    </Text>
                </Voice> || null}
            </View>
        );
    }
}


const styles = StyleSheet.create(function (theme) {
    return {
        row: {
            alignItems: 'center',
            height: theme.itemHeightM,
            flexDirection: 'row',
            marginLeft: theme.paddingHorizontal,
            borderTopColor: theme.borderColor,
            borderTopWidth: theme.px,
        },
        name: {
            color: theme.wordPageColor
        },
        color: {
            color: '#b8879c'
        },
        voice: {
            backgroundColor: theme.wordPageBackgroundColor
        },
        marginLeft: {
            marginLeft: 4
        },
        textColor: {
            color: theme.wordPageColor
        },
    }
});


export default Main;