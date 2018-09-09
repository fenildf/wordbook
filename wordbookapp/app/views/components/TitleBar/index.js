'use strict'
import React,{Component} from 'react';
import {ViewPager} from 'react-native-awesome-viewpager';
import {View} from 'react-native';
import Item from './Item';
import Header from './Header';
import StyleSheet from 'react-native-theme-stylesheet';
import LazyView from './../LazyView';


const HEADER_REF = 'HEADER_REF';
const PAGE_REF = 'PAGE_REF';
class TitleBar extends Component{
    constructor(...props){
        super(...props);
        this.views = [];
    }
    _classify(children){

        let headers = [];
        let pages = [];
        React.Children.forEach(children,(child,index)=>{
             let {title,children} = child.props;
             headers.push({title});
             pages.push(<View key={index}><LazyView  ref={v=>this.views[index]=v} child={children} load={index===0}/></View>);
        });
        return {headers,pages};
    }
    _onPageSelected=({nativeEvent:{position}})=>{
        this.refs[HEADER_REF].setHeader(position);
        this.views[position] && this.views[position].load();
    }
    _onHeaderSelected=(position)=>{
        this.refs[PAGE_REF].setPageWithoutAnimation(position);
        this.views[position] && this.views[position].load();
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
        if(pages.length<1){
            return null;
        }
        return (
            <View
                style={style}>
                <Header 
                    ref={HEADER_REF}
                    style={styles.header}
                    onItemClick={this._onHeaderSelected}
                    data={headers}/>
                <ViewPager
                    ref={PAGE_REF}
                    onPageSelected={this._onPageSelected}
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