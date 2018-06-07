'use strict'

import React from 'react';

import FontIcon from './../../components/FontIcon';
import Text from './../../components/Text';
import { View } from 'react-native';
import TouchableOpacity from './../../components/TouchableOpacity';
import StyleSheet from './../../../util/StyleSheet';
import IconItem from './../../components/IconItem';
import ScrollView from './../../components/ScrollView';
import FoldableItem from './../../components/FoldableItem';
import Voice from './../../components/Voice';

function renderMeading(meaning) {
    if (!meaning) {
        return null;
    }
    if (meaning.error) {
        return (
            <Text>抱歉，未能找到该单词的解释。</Text>
        );
    }
    return [
        <BasicMeaning
            key={'BasicMeaning'}
            data={meaning.baesInfo} />,
        <Sentence
            key={'Sentence'}
            data={meaning.sentence} />,
        <StemsAffixes
            key={'StemsAffixes'}
            data={meaning.stems_affixes} />,
        <EEMeaning
            key={'EEMeaning'}
            data={meaning.ee_mean} />,

    ]
}

function BasicMeaning(props) {
    let data = props.data;
    let symbols = data.symbols[0];
    let parts = symbols.parts;
    return (
        <View>
            <View style={[styles.marginBottom, styles.row]}>
                <Text>
                    英
                </Text>
                {symbols.ph_en_mp3?<Voice style={[styles.voice,styles.marginLeft]} voice={symbols.ph_en_mp3} />:null}
                <Text style={styles.marginLeft}>[{symbols.ph_en}]</Text>
                <Text>
                    美
                </Text>
                {symbols.ph_am_mp3?<Voice style={[styles.voice,styles.marginLeft]} voice={symbols.ph_am_mp3} />:null}
                <Text style={styles.marginLeft}>[{symbols.ph_am}]</Text>
            </View>
            {
                parts.map(function (part) {
                    return (
                        <Text
                            key={part.part}>
                            {part.part}{part.means.join(';')}
                        </Text>
                    )
                })
            }

        </View>
    )
}
function Sentence(props) {
    let data = props.data;
    return (
        <FoldableItem
            defaultUnfold={true}
            titleStyle={styles.titleStyle}
            title='例句'>
            {data.map(function (s) {
                return (
                    <View
                        style={[styles.marginBottom]}
                        key={s.Network_id}>
                        <Text style={[styles.marginBottom]}>
                            {s.Network_en}
                        </Text>
                        <Text
                            style={[styles.marginBottom]}>
                            {s.Network_cn}
                        </Text>
                    </View>
                )
            })}
        </FoldableItem>
    );
}

function renderWordParts(wordParts) {
    return wordParts.map(function (part, i) {
        return (
            <View
                key={i}>
                <Text>
                    {part.word_parts}
                </Text>
                {
                    renderStemsAffixes(part.stems_affixes)
                }
            </View>
        )
    });
}
function renderStemsAffixes(stems_affixes) {
    return stems_affixes.map(function (stems) {
        return (
            <View
                key={stems.value_en}
                style={[styles.marginBottom]}>
                <Text
                    style={[styles.marginBottom]}>
                    {stems.value_en}{stems.value_cn}
                </Text>
                <Text
                    style={[styles.marginBottom]}>
                    {stems.word_buile}
                </Text>
            </View>
        );
    })
}
function StemsAffixes(props) {
    let data = props.data;
    if (!data) {
        return null;
    }
    return (
        <FoldableItem
            titleStyle={styles.titleStyle}
            title='词根词缀'>
            {data.map(function (s) {
                return (
                    <View
                        key={s.type_value}>
                        <Text>
                            {s.type}
                            {s.type_value}
                            {s.type_exp}
                        </Text>
                        <View>
                            {renderWordParts(s.word_parts)}
                        </View>
                    </View>
                )
            })}
        </FoldableItem>
    );
}
function renderMeaing(means) {
    return means.map(function (mean, i) {
        return (
            <View
                key={i + ''}>
                <Text
                    style={[styles.marginBottom]}>
                    {mean.word_mean}
                </Text>
                {mean.sentences.map(function (sentence) {
                    return (
                        <Text
                            style={[styles.marginBottom]}
                            key={sentence.sentence}>
                            {sentence.sentence}
                        </Text>
                    );
                })}
            </View>
        );
    });
}
function EEMeaning(props) {
    let data = props.data;
    if (!data) {
        return null;
    }
    return (
        <FoldableItem
            titleStyle={styles.titleStyle}
            title='英英释义'>
            {data.map(function (meaning) {
                return (
                    <View
                        key={meaning.part_name}>
                        <Text
                            style={[styles.marginBottom]}>
                            {meaning.part_name}
                        </Text>
                        {renderMeaing(meaning.means)}
                    </View>
                )
            })}
        </FoldableItem>
    );
}
function Meaning(props) {
    let {
        meaning
    } = props;

    return (
        <View
            style={styles.wrapper}>
            <ScrollView>
                {renderMeading(meaning)}
            </ScrollView>
        </View>

    );
}


const styles = StyleSheet.create(function (theme) {
    return {
        wrapper: {
            flex: 1,
            marginLeft: theme.paddingHorizontal,
            paddingRight: theme.paddingHorizontal,
            borderTopColor: theme.borderColor,
            borderTopWidth: theme.px,
            paddingVertical: theme.paddingHorizontal,
        },
        row: {
            flexDirection: 'row',
            alignItems:'center'

        },
        voice:{
            height:18,
            width:20
        },
        marginLeft:{
            marginLeft:4
        },
        titleStyle: {
            color: '#8fb7d1'
        },
        symbols: {

        },
        marginBottom: {
            marginBottom: 8
        }
    }
});


export default Meaning;