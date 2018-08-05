'use strict'
import React,{Component} from 'react';
import {
    View,
} from 'react-native';

import TouchableOpacity from './../../components/TouchableOpacity';
import Text from './../../components/Text';
import StyleSheet from './../../../util/StyleSheet';
import TextInput from './../../components/TextInput';
import {dispatch} from 'febrest';
import actions from './../../../constants/actions'
class AddWord extends Component{
    static routeConfig = {
        name:'AddWord'
    }
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:'添加新单词'
        }
        this.state = {
            value:''
        }
    }
    _onChangeText=(t)=>{
        this.setState({value:t})
    }
    _markWord=()=>{
        let name = this.state.value;
        if(/^\s+$/.test(name)){
            return;
        }
        dispatch(actions.USER_MARK_WORD,{
            bookName:'USER_BOOK',
            isRemember:false,
            word:{name}
        });
        this.setState({value:''})
    }
    render(){
        return (
            <View
                style={styles.wrapper}>
                <View
                    style={styles.main}>
                    <View
                        style={styles.row}>
                        <TextInput
                            placeholder='在这里输入您要添加的单词'
                            value={this.state.value}
                            onChangeText={this._onChangeText}
                            style={styles.input} />
                    </View>
                    
                </View>
                <TouchableOpacity
                    onPress={this._markWord}
                    style={styles.button}>
                    <Text>
                        添加
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const  styles = StyleSheet.create(theme=>{
    return {
    wrapper:{
        flex:1
    },
    main:{
        flex:1
    },
    row:{
        height:theme.itemHeightH,
        flexDirection:'row',
        backgroundColor:theme.backgroundColor,
        paddingLeft:theme.paddingHorizontal
        // borderTopColor:theme.borderColor,
        // borderTopWidth:theme.px,
    },
    input:{
        height:theme.itemHeightH,
    },
    button:{
        height:theme.itemHeightH,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:theme.backgroundColor,
        borderTopColor:theme.borderColor,
        borderTopWidth:theme.px,
    }
}
})
export default AddWord;