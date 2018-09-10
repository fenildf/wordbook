'use strcit'
import React, { Component } from 'react'

import {
    View
} from 'react-native';

import FlatList from './../../components/FlatList';
import { createDispatcher } from 'react-febrest';
import { dispatch } from 'febrest';
import actions from '../../../constants/actions';
import Item from './Item';
import StyleSheet from 'react-native-theme-stylesheet';
import ContextMenu from './ContextMenu'
import TouchableOpacity from './../../components/TouchableOpacity'
import Text from './../../components/Text'
class Section extends Component {
    static routeConfig = {
        name: 'Section'
    }
    constructor(...props) {
        super(...props);
        let params = this.props.navigation.state.params || {};
        let section = params.section || {}
        this.navigationOptions = {
            title: section.name || '单词本'
        }
        this.state = {
            words: [],
            section
        }
        this.dispatcher = createDispatcher(this, this._onData);
        this.dispatcher.watch(this._onProviderChange)
        this._contextMenu = null;
        this._contextWord = null;
    }
    _onData(data) {
    }
    _onProviderChange = (change) => {
        if (change.word) {
            let section = this.state.section
            this.dispatcher.dispatch(actions.WORD_GET_WORDS, { bookName: section.bookName, sectionName: section.name })
        }
    }
    componentDidMount() {
        let section = this.state.section
        this.dispatcher.dispatch(actions.WORD_GET_WORDS, { bookName: section.bookName, sectionName: section.name })
    }
    componentWillUnmount() {
        this.dispatcher.release();
    }
    _onItemLongPress = ({ nativeEvent }, item) => {
        let { bookName } = this.state.section;
        if (bookName != '我的单词本' || bookName !== '我的生词本') {
            return;
        }
        this._contextMenu.show({
            top: nativeEvent.pageY - 64 - nativeEvent.locationY + 40,
            left: nativeEvent.pageX,
        });
        this._contextWord = item;
    }
    _onItemPress = ({ nativeEvent }, item) => {
        dispatch(actions.APP_NAVIGATE, { routeName: 'Word', params: { bookName: section.bookName, sectionName: section.name, word: item } })
    }
    _removeWord() {

    }
    _editWord() {

    }
    _renderItem = ({ item, index }) => {
        let { section } = this.state;
        return (
            <Item
                onPress={(event) => this._onItemPress(event, item)}
                onLongPress={event => this._onItemLongPress(event, item)}
                data={item} />
        )
    }
    _keyExtractor = (item) => {
        return (item.id || item.name) + '';
    }
    render() {
        return (
            <View
                style={styles.wrapper}>
                <FlatList
                    ref='List'
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    style={styles.wrapper}
                    data={this.state.words} />
                <ContextMenu
                    ref={(menu) => this._contextMenu = menu}>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={this._editWord}>
                        <Text>编辑</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={this._removeWord}>
                        <Text>删除</Text>
                    </TouchableOpacity>
                </ContextMenu>
            </View>
        )

    }
}

const styles = StyleSheet.create(function (theme) {
    return {
        wrapper: {
            flex: 1,
            backgroundColor: theme.backgroundColor,
        },
        menuItem: {
            width: 80,
            paddingLeft: theme.paddingHorizontal,
            paddingVertical: theme.paddingHorizontal,
        }
    }
});
export default Section;