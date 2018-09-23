'use strict'
import React, { Component } from 'react';

import {
    View,
    InteractionManager
} from 'react-native';

import { dispatch,unsubscribe,subscribe} from 'febrest';
import actions from '../../../constants/actions';
import Footer from './Footer';
import Main from './Main';
import Meaning from './Meaning';

import StyleSheet from 'react-native-theme-stylesheet';

class Page extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            showMeaning: false
        }
    }
    componentDidMount() {
        this._onShowMeaning();
    }
    componentWillUnmount() {
    }

    showMeaning() {
        this.setState({ showMeaning: true })
        // this.setState({meaning:null})
        // this._onShowMeaning();
    }
    _onShowMeaning = () => {
        let { word } = this.props;
        if (!word.meaning) {
            dispatch(actions.WORD_GET_MEANING, word.name).then(({ state }) => {
                //需要优化
                this.props.word.meaning = state.meaning;
                this.forceUpdate();
            });
        }
    }

    render() {
        let { word } = this.props;
        let { showMeaning } = this.state;
        let { meaning } = word;
        return (
            <View
                style={styles.wrapper}>
                <Main
                    meaning={meaning}
                    word={word} />
                {
                    showMeaning ?
                        <Meaning
                            meaning={meaning} />
                        :
                        null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create(function (theme) {
    return {
        wrapper: {
            flex: 1,
        },
        theme: {
            backgroundColor: theme.wordPageBackgroundColor
        }
    }
});
export default Page;