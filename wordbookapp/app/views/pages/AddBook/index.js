'use strict'
import React,{Component} from 'react';
import {
    View,
} from 'react-native';

import ScrollView from './../../components/ScrollView';
import { createDispatcher } from 'react-febrest';
import { dispatch } from 'febrest';
import StyleSheet from './../../../util/StyleSheet';

import actions from '../../../constants/actions';
import Text from './../../components/Text';
import BookSection from './BookSection';
import NavigationManager from './../../../util/NavigationManager';

import FoldableItem from './../../components/FoldableItem';

class AddBook extends Component {
    static routeConfig = {
        name:'AddBook'
    }
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '添加单词本',
            rightButton: this._renderRightButton(),
            onRightButtonPress: this._onRightButtonPress,
        }
        this.state = {
            classify: [],
            selectItem:0
        }
        this._selectedBooks = {

        }
        this.dispatcher = createDispatcher(this, this._onData);
    }
    _onData(data) {
    }
    _onRightButtonPress = () => {
        dispatch(actions.USER_ADD_BOOKS, this._selectedBooks);
        NavigationManager.goBack();
    }
    componentDidMount() {
        this.dispatcher.dispatch(actions.WORD_GET_CLASSIFY);
    }
    componentWillUnmount() {
        this.dispatcher.release();
    }

    _selectedItem = (isSelected, book) => {
        if (isSelected) {
            this._selectedBooks[book.name] = book;
        } else {
            delete this._selectedBooks[book.name];
        }
    }
    _closeItem=(state,index)=>{
        if(!state){
            this.setState({selectItem:index});
            this.refs.ScrollView.scrollTo({
                y:0,
                animated:false
            })
        }else{
            this.setState({selectItem:null});
        }
    }
    _renderBooks() {
        let classify = this.state.classify;
        return classify.map((item, index) => {
            return (
                <FoldableItem
                    key={item.name}
                    fold={this.state.selectItem!==index}
                    onStateChange={(state) => this._closeItem(state,index)}
                    style={[styles.itemStyle, styles.borderTop]}
                    title={item.name}>
                    {BookSection(item.children, this._selectedItem,this._selectedBooks)}
                </FoldableItem>
            )
        });
    }
    _renderRightButton() {
        return (
            <Text>添加</Text>
        )
    }
    render() {
        return (
            <ScrollView
                ref='ScrollView'
                style={styles.wrapper}>
                {this._renderBooks()}
                <View 
                    style={styles.margin}/>
            </ScrollView>

        )
    }
}
const styles = StyleSheet.create(function (theme) {
    return {
        wrapper: {
            flex: 1
        },
        borderTop: {
            borderTopWidth: theme.px,
            borderColor: theme.borderColor
        },
        itemStyle: {
            backgroundColor: '#fff',
            paddingLeft: theme.paddingHorizontal,
        },
        margin:{
            height:theme.itemHeightM
        }
    }
})
export default AddBook;