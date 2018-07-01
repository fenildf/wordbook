'use strict'

import React from 'react';

import Text from './../../components/Text';
import { View } from 'react-native';
import StyleSheet from './../../../util/StyleSheet';
import ScrollView from './../../components/ScrollView';
import FoldableItem from './../../components/FoldableItem';
import Voice from './../../components/Voice';
import EmptyText from './EmptyText';

function renderMeading(meaning) {
    if (!meaning) {
        return null;
    }
    if (meaning.error) {
        return (
            <EmptyText 
                style={styles.textColor}
                text='抱歉，未能找到该单词的解释。'/>
        )
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
    try {
        let symbols = data.symbols[0];
        let parts = symbols.parts;
        return (
            <View
                style={styles.itemStyle}>
                <View style={[styles.marginBottom, styles.row]}>
                    <Text
                        style={styles.textColor}>
                        英
                    </Text>
                    {symbols.ph_en_mp3 ? <Voice style={[styles.voice, styles.marginLeft]} voice={symbols.ph_en_mp3} /> : null}
                    <Text style={[styles.marginLeft,styles.textColor]}>[{symbols.ph_en}]</Text>
                    <Text style={[styles.marginLeft,styles.textColor]}>
                        美
                    </Text>
                    {symbols.ph_am_mp3 ? <Voice style={[styles.voice, styles.marginLeft]} voice={symbols.ph_am_mp3} /> : null}
                    <Text style={[styles.marginLeft,styles.textColor]}>[{symbols.ph_am}]</Text>
                </View>
                {
                    parts.map(function (part) {
                        return (
                            <Text
                                style={styles.textColor}
                                key={part.part}>
                                {part.part}{part.means.join(';')}
                            </Text>
                        )
                    })
                }

            </View>
        )
    } catch (e) {
        if(data.translate_result){
            return <EmptyText 
                        style={styles.textColor}
                        text={data.translate_result}/>
        }
        return (
            <EmptyText 
                style={styles.textColor}
                text='抱歉，未能找到该单词的解释。'/>
        )
    }

}
function Sentence(props) {
    try {
        let data = props.data;
        return (
            <FoldableItem
                style={styles.itemStyle}
                itemStyle={styles.itemStyle}
                titleStyle={styles.titleStyle}
                title='例句'>
                {data.map(function (s) {
                    return (
                        <View
                            style={[styles.marginBottom]}
                            key={s.Network_id}>
                            {s.tts_mp3 ? <Voice style={[styles.voice, styles.marginBottom]} voice={s.tts_mp3} /> : null}
                            <Text style={[styles.marginBottom,styles.textColor]}>
                                {s.Network_en}
                            </Text>
                            <Text
                                style={[styles.marginBottom,styles.textColor]}>
                                {s.Network_cn}
                            </Text>
                        </View>
                    )
                })}
            </FoldableItem>
        );
    } catch (e) {
        return null;
    }

}

function renderWordParts(wordParts) {
    return wordParts.map(function (part, i) {
        return (
            <View
                key={i}>
                <Text
                    style={styles.textColor}>
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
                    style={[styles.marginBottom,styles.textColor]}>
                    {stems.value_en}{stems.value_cn}
                </Text>
                <Text
                    style={[styles.marginBottom,styles.textColor]}>
                    {stems.word_buile}
                </Text>
            </View>
        );
    })
}
function StemsAffixes(props) {
    try {
        let data = props.data;
        if (!data) {
            return null;
        }
        return (
            <FoldableItem
                fold={true}
                style={styles.itemStyle}
                itemStyle={styles.itemStyle}
                titleStyle={styles.titleStyle}
                title='词根词缀'>
                {data.map(function (s) {
                    return (
                        <View
                            key={s.type_value}>
                            <Text
                                style={styles.textColor}>
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
            </FoldableItem>)
    } catch (e) {
        return null;
    }
}
function renderMeaing(means) {
    return means.map(function (mean, i) {
        return (
            <View
                key={i + ''}>
                <Text
                    style={[styles.marginBottom,styles.textColor]}>
                    {mean.word_mean}
                </Text>
                {mean.sentences.map(function (sentence) {
                    return (
                        <Text
                            style={[styles.marginBottom,styles.textColor]}
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
            fold={true}
            style={styles.itemStyle}
            itemStyle={styles.itemStyle}
            titleStyle={styles.titleStyle}
            title='英英释义'>
            {data.map(function (meaning) {
                return (
                    <View
                        key={meaning.part_name}>
                        <Text
                            style={[styles.marginBottom,styles.textColor]}>
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
            <ScrollView
                style={styles.sv}>
                {renderMeading(meaning)}
            </ScrollView>
        </View>

    );
}


const styles = StyleSheet.create(function (theme) {
    return {
        wrapper: {
            flex: 1,
            backgroundColor:theme.wordPageBackgroundColor,
            marginLeft: theme.paddingHorizontal,
            paddingRight: theme.paddingHorizontal,
            borderTopColor: theme.borderColor,
            borderTopWidth: theme.px,
            paddingVertical: theme.paddingHorizontal,
        },
        textColor:{
            color:theme.wordPageColor
        },
        itemStyle:{
            backgroundColor:theme.wordPageBackgroundColor,
        },
        sv:{
            backgroundColor:theme.wordPageBackgroundColor,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center'

        },
        voice: {
            height: 18,
            width: 20
        },
        marginLeft: {
            marginLeft: 4
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