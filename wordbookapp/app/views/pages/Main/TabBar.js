'use strict'
import React,{Component} from 'react';
import {TabBar as Tab} from 'react-native-awesome-viewpager';
import {View} from 'react-native';

import StyleSheet from 'react-native-theme-stylesheet';
import FontIcon from './../../components/FontIcon';
import Text from './../../components/Text';
import Books from './Books';
import WordBook from './WordBook';


const acitveColor = '#413d3c';
const inactiveColor = '#b5b6ad';
//统计 ios-stats
const tabs = [
    {
        name:'书架',
        icon:'ios-briefcase',
        acitveColor,
        inactiveColor
    },
    {
        name:'单词',
        icon:'ios-calendar',
        acitveColor,
        inactiveColor
    }
]
class TabBar extends Component{
    constructor(...props){
        super(...props);
    }
    _renderTab=(tab, i, page)=>{
        let isSelected = i === page;
        let color = isSelected?tab.acitveColor:tab.inactiveColor
        return (
            <View
                style={styles.tab}>
                <FontIcon 
                    name={tab.icon}
                    color={color}
                    size={20}/>
                <Text
                    style={[styles.text,{color}]}>
                    {tab.name}
                </Text>
            </View>
        );
    }
    render(){
        let {
            style
        } = this.props;
        return (
            <Tab
                tabs={tabs}
                style={style}
                renderTab={this._renderTab}>
                <View>
                    <Books /> 
                </View>
                <View>
                    <WordBook />
                </View>
            </Tab>
        )
    }
}

const styles = StyleSheet.create((theme)=>{
    return {
        tab:{
            flex: 1, 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center' 
        },
        text:{
            fontSize: 12,
            height: 16,
            lineHeight: 16,
            marginTop: 5
        }
    }
})

export default TabBar;