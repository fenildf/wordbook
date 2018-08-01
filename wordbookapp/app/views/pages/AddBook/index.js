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
            rightButton: this._renderRightButton(),
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
        dispatch(actions.APP_NAVIGATE_GOBACK);
    }
    componentDidMount() {
        this.dispatcher.dispatch(actions.WORD_GET_CLASSIFY);
    }
    componentWillUnmount() {
        this.dispatcher.release();
    }

    // _selectedItem = (isSelected, book) => {
    //     if (isSelected) {
    //         this._selectedBooks[book.name] = book;
    //     } else {
    //         delete this._selectedBooks[book.name];
    //     }
    // }
    // _closeItem=(state,index)=>{
    //     if(!state){
    //         this.setState({selectItem:index});
    //         this.refs.ScrollView.scrollTo({
    //             y:0,
    //             animated:false
    //         })
    //     }else{
    //         this.setState({selectItem:null});
    //     }
    // }
    // _renderBooks() {
    //     let classify = this.state.classify;
    //     return classify.map((item, index) => {
    //         return (
    //             <FoldableItem
    //                 key={item.name}
    //                 fold={this.state.selectItem!==index}
    //                 onStateChange={(state) => this._closeItem(state,index)}
    //                 style={[styles.itemStyle, styles.borderTop]}
    //                 title={item.name}>
    //                 {BookSection(item.children, this._selectedItem,this._selectedBooks)}
    //             </FoldableItem>
    //         )
    //     });
    // }
    _renderRightButton() {
        return (
            <TouchableOpacity
                onPress={this._onRightButtonPress}>
                <Text>添加</Text>
            </TouchableOpacity>
        )
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
            <View 
                style={styles.wrapper}>
                {/* <Search 
                    onPress={()=>dispatch(actions.APP_NAVIGATE,{routeName:'SearchBook'})}/> */}
                
                <TitleBar
                    style={styles.wrapper}>
                    {this._renderPages()}
                </TitleBar>
            </View>
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