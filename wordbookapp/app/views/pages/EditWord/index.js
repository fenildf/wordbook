'use strict'
import React,{Component} from 'react';
import {
    View,
} from 'react-native';

import TouchableOpacity from './../../components/TouchableOpacity';
import Text from './../../components/Text';
import StyleSheet from 'react-native-theme-stylesheet';
import TextInput from './../../components/TextInput';
import {dispatch} from 'febrest';
import actions from './../../../constants/actions'
class EditWord extends Component{
    static routeConfig = {
        name:'EditWord'
    }
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:'编辑单词'
        }
        let params = this.props.navigation.state.params || {};
        this.state = {
            value: params.word || '',
            oldValue: params.word
        }
    }
    _onChangeText=(t)=>{
        this.setState({value:t})
    }
    _editWord=()=>{
        let name = this.state.value;
        if(/^\s+$/.test(name)){
            return;
        }
        dispatch(actions.USER_EDIT_WORD,{
            oldName:this.state.oldValue,
            name:this.state.value
        });
        dispatch(actions.APP_NAVIGATE_GOBACK);
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
                            placeholder='请输入单词'
                            value={this.state.value}
                            onChangeText={this._onChangeText}
                            style={styles.input} />
                    </View>
                    
                </View>
                <TouchableOpacity
                    onPress={this._editWord}
                    style={styles.button}>
                    <Text>
                        保存
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
        flex:1
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
export default EditWord;