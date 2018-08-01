'use strict'
import React,{Component} from 'react';
import {ViewPager} from 'react-native-awesome-viewpager';
import {View} from 'react-native';
import Item from './Item';
import Header from './Header';
import StyleSheet from './../../../util/StyleSheet';

class TitleBar extends Component{
    constructor(...props){
        super(...props);
    }
    _classify(children){

        let headers = [];
        let pages = [];
        React.Children.forEach(children,child=>{
             let {title,children} = child.props;
             headers.push({title});
             pages.push(children);
        });
        return {headers,pages};
    }
    render(){
        let {
            style,
            children
        } = this.props;
        let {
            headers,
            pages
        } = this._classify(children);
        return (
            <View
                style={style}>
                <Header 
                    style={styles.header}
                    data={headers}/>
                <ViewPager
                    style={styles.viewpager}>
                    {pages}
                </ViewPager>  
            </View>
        )
    }
}

TitleBar.Item = Item;

const styles = StyleSheet.create(theme=>{
    return {
        header:{
            borderBottomWidth:theme.px,
            borderBottomColor:theme.borderColor,
            height:36,
        },
        viewpager:{
            flex:1
        }
    }
})
export default TitleBar;