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
        this.dispatcher = createDispatcher(this, this._onData);
    }
    _onData({key,state}) {
        
    }
    _add(item){
        this.dispatcher.dispatch(actions.USER_ADD_BOOKS,{[item.name]:item});
        dispatch(actions.TOAST,'添加成功');
    }
  
    componentDidMount() {
        this.dispatcher.dispatch(actions.WORD_GET_CLASSIFY);
    }
    componentWillUnmount() {
        this.dispatcher.release();
    }
    _renderPages(){
        let classify = this.state.classify;
        return classify.map((item, index) => {
            return (
                <TitleBarItem
                    key={item.name}
                    title={item.name}>
                    <View>
                        <ScrollView>
                            {
                                item.children.map(child=>{
                                    return (
                                        <Item 
                                            key={child.name}
                                            name={child.name}
                                            classify={child.classify}
                                            onPress={()=>this._add(item)}
                                            count={child.count}/>
                                    );
                                })
                            }
                        </ScrollView>
                    </View>
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