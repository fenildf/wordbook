import React from 'react';

import {View} from 'react-native';

import FontIcon from './../../components/FontIcon';
import TouchableOpacity from './../../components/TouchableOpacity';
import Text from './../../components/Text';
import StyleSheet from './../../../util/StyleSheet';

function Search({onPress}){
    return (
        <View
            style={styles.wrapper}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.view}>
                <FontIcon 
                    name='ios-search'/>
                <Text> 搜索</Text>
            </TouchableOpacity>
        </View>
        
    );
}

const styles = StyleSheet.create(function(theme){
    return {
        wrapper:{
            height:48,
            backgroundColor:'#fff'
        },
        view:{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            marginVertical:6,
            flex:1,
            borderRadius:18,
            marginHorizontal:theme.paddingHorizontal,
            backgroundColor:'rgba(220,220,220,0.2)'
        }
    }
})
export default Search;