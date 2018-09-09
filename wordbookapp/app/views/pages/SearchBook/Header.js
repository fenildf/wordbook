'use strict'
import React from 'react';
import FontIcon from './../../components/FontIcon';
import TouchableOpacity from './../../components/TouchableOpacity';
import Text from './../../components/Text';
import {View} from 'react-native';
import actions from '../../../constants/actions';
import {dispatch} from 'febrest';
import TextInput from './../../components/TextInput';
import StyleSheet from 'react-native-theme-stylesheet';

function Header({onChangeText,onSubmitEditing}){
    return (
        <View
            style={styles.header}>
            <TouchableOpacity
                onPress={()=>dispatch(actions.APP_NAVIGATE_GOBACK)}
                style={styles.leftButton}>
                <FontIcon style={styles.backArrow} name='ios-arrow-round-back-outline'/>
            </TouchableOpacity>
            <TextInput 
                style={styles.input}
                onChangeText={onChangeText}
                placeholder='请输入单词本名称进行搜索'
                onSubmitEditing={onSubmitEditing}
                returnKeyType='search'/>
        </View>
    )
}


const styles = StyleSheet.create(function(theme){
    return {
        header:{
            height:theme.navigationHeaderHeight,
            paddingTop:theme.navigationHeaderPaddingTop,
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:theme.navigationHeaderBackgroundColor
        },
        backArrow:{
            color:theme.navigationHeaderColor
        },
        leftButton:{
            paddingHorizontal:theme.navigationHeaderLeftButtonMargin,
        },
        input:{
            flex:1,
            height:36,
            marginRight:40
        }
        
    };
})
export default Header;