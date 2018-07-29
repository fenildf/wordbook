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
    let {s, m, se, ee, sa,tr,error} = meaning;
    if (error) {
        return (
            <EmptyText 
                style={styles.textColor}
                text='抱歉，未能找到该单词的解释。'/>
        )
    }
   
    return [
        <BasicMeaning
            key={'BasicMeaning'}
            s={s}
            m={m}
            tr={tr} />,
        <Sentence
            key={'Sentence'}
            data={se} />,
        <StemsAffixes
            key={'StemsAffixes'}
            data={sa} />,
        <EEMeaning
            key={'EEMeaning'}
            data={ee} />,

    ]
}

function BasicMeaning(props) {
    let {s,m,tr} = props;
    if(m){
        return (
            <View
                style={styles.itemStyle}>
                {
                    m.map(function (part) {
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
    }else if(tr){
        return (
            <EmptyText 
                style={styles.textColor}
                text={tr}/>
        );
    }else{
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
                            key={s.en}>
                            {s.voice ? <Voice style={[styles.voice, styles.marginBottom]} voice={s.tts_mp3} /> : null}
                            <Text style={[styles.marginBottom,styles.textColor]}>
                                {s.en}
                            </Text>
                            <Text
                                style={[styles.marginBottom,styles.textColor]}>
                                {s.cn}
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
function renderEEMeaning(means) {
    return means.map(function (mean, i) {
        return (
            <View
                key={mean.mean}>
                <Text
                    style={[styles.marginBottom,styles.textColor]}>
                    {mean.mean}
                </Text>
                {mean.sentences.map(function (sentence) {
                    return (
                        <Text
                            style={[styles.marginBottom,styles.textColor]}
                            key={sentence}>
                            {sentence}
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
                        key={meaning.part}>
                        <Text
                            style={[styles.marginBottom,styles.textColor]}>
                            {meaning.part}
                        </Text>
                        {renderEEMeaning(meaning.means)}
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
            backgroundColor:theme.wordPageBackgroundColor,
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