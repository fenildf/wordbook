'use strict'
import React,{Component} from 'react';
import {
    View,
} from 'react-native';

import FlatList from './../../components/FlatList';
import { dispatch } from 'febrest';
import StyleSheet from 'react-native-theme-stylesheet';

import actions from '../../../constants/actions';
import Text from './../../components/Text';
import TouchableOpacity from '../../components/TouchableOpacity';
import TitleBar from './../../components/TitleBar';


const TitleBarItem = TitleBar.Item;
import Item from './Item'


class AddBook extends Component {
    static routeConfig = {
        name:'AddBook'
    }
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '添加单词本',
        }
        this.state = {
            classify: [],
            selectItem:0
        }
        this._selectedBooks = {

        }
    }
    _add(item){
        dispatch(actions.USER_ADD_BOOKS,{[item.name]:item}).then(()=>{
            dispatch(actions.TOAST,'添加成功');
        });
    }
  
    componentDidMount() {
        dispatch(actions.WORD_GET_CLASSIFY).then(({state})=>{
            this.setState(state);
        });
    }
    componentWillUnmount() {
    }
    _renderPages(){
        let classify = this.state.classify;
        return classify.map((item, index) => {
            return (
                <TitleBarItem
                    key={item.name}
                    title={item.name}>
                    <FlatList 
                        keyExtractor={item=>item.name}
                        data={item.children}
                        renderItem={({item})=> (
                                            <Item 
                                                key={item.name}
                                                name={item.name}
                                                classify={item.classify}
                                                onPress={()=>this._add(item)}
                                                count={item.count}/>
                                        )}/>
                </TitleBarItem>
            )
        });
    }
    render() {
        return (
            <TitleBar
                style={styles.wrapper}>
                {this._renderPages()}
            </TitleBar>
        )
    }
}
const styles = StyleSheet.create(function (theme) {
    return {
        wrapper: {
            flex: 1,
            backgroundColor: theme.backgroundColor,
            paddingBottom:10
        },
        borderTop: {
            borderTopWidth: theme.px,
            borderColor: theme.borderColor
        },
        itemStyle: {
            backgroundColor: theme.backgroundColor,
            paddingLeft: theme.paddingHorizontal,
        },
        margin:{
            height:theme.itemHeightM
        }
    }
})
export default AddBook;