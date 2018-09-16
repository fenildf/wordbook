'use strict'
import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';

import {
    ViewPager,
} from 'react-native-awesome-viewpager';
import Page from './Page';
import C from './C';

class Pages extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            autoTranslate:this.props.autoTranslate
        }
        this._wordIndex = 0;
        this._position = 0;
    }
    componentDidMount(){
        this._wordIndex = this._findWordIndex(this.props.word,this.props.dataSource);
        if(Platform.OS==='ios'){
            setTimeout(()=>this._update(),100)
        }else{
            this._update();
        }
        
    }
    componentDidUpdate(){
        if(this.props.autoTranslate && !this.state.autoTranslate){
            this._currentPage && this._currentPage.showMeaning();
        }
        this.state.autoTranslate = this.props.autoTranslate;
    }
    translate(){
        this._currentPage&&this._currentPage.showMeaning();
    }
    _setPage(page) {
        if (page===undefined) {
            return;
        }
        this._position = page;
        this.refs['VIEWPAGER_REF'].setPageWithoutAnimation(page);
    }
    _findWordIndex(word,words){
        let i=0,l =words.length;
        while(word.name !== words[i].name && i<l){
            i++;
        }
        return i;
    }
    _update(){
        let {dataSource,autoTranslate} = this.props;
        let item,item0,item1,item2,page0 = null,page1 = null,page2 = null,position;
        let {_wordIndex} = this;
        item0 = dataSource[_wordIndex-1];
        item1 = dataSource[_wordIndex];
        item2 = dataSource[_wordIndex+1];
        if (item0 == null) {
            item0 = item1;
            item1 = item2;
            item2 = {};
            page0 = <Page key={item0.name} ref={v=>this._currentPage=v} word={item0}/>
            page1 = item1?<Page key={item1.name} word={item1}/>:null;//item1当只有一个单词的时候可能是null
            item = item0;
            position = 0;
        } else if (item2 == null) {
            item2 = item1;
            item1 = item0;
            item = item2;
            page1 = item1?<Page key={item1.name} word={item1}/>:null;//item1当只有一个单词的时候可能是null
            page2 = item2?<Page key={item2.name} ref={v=>this._currentPage=v} word={item2}/>:null
            item0 = {};
            position = 2;
        }else{
            page0 = <Page key={item0.name} word={item0}/>
            page1 = <Page key={item1.name} ref={v=>this._currentPage=v} word={item1}/>
            page2 = <Page key={item2.name} word={item2}/>
            item = item1;
            position = 1;
        }
        Promise.all(
            this.refs['C_0'].setChild(page0),
            this.refs['C_1'].setChild(page1),
            this.refs['C_2'].setChild(page2)
        ).then(() => {
            this.props.onWordSelected && this.props.onWordSelected(item);
            this._setPage(position);
            if(this._currentPage && autoTranslate){
                this._currentPage.showMeaning();
            }
        })
    }
    _onPageSelected = (event) => {
        let { position } = event.nativeEvent;
        let {_position} = this;
        let {_wordIndex} = this;
        if (_position == position) {
            return;
        }
        if (_position == 0 && position == 1 && _wordIndex==0 ) {
            /**
             * 说明只有两条数据，到第二页的时候要去拿数据
             */
            this._wordIndex++;
            this._update();
            return;

        }
        if(_position == 1){
            if(position==2){
                this._wordIndex++;
            }else if(position==0){
                this._wordIndex--;
            }
            this._update();
            return;
        }
        if(_position == 2 && position == 1 && _wordIndex == this.props.dataSource.length-1){
            this._wordIndex--;
            this._update();
            return;
        }
    }
    next(){
        let {_position} = this;
        if(_position!==2){
            this.refs['VIEWPAGER_REF'].setPageWithoutAnimation(2);
        }
    }
    render() {
        let {dataSource} = this.props;
        if(!dataSource||dataSource.length<1){
            return null;
        }
        return (
            <ViewPager
                ref='VIEWPAGER_REF'
                initialPage={1}
                onPageSelected={this._onPageSelected}
                scrollEnabled={dataSource.length>1}
                style={this.props.style}>
                 <View>
                    <C 
                        ref='C_0'/>
                </View>
                <View>
                    <C 
                        ref='C_1'/>
                </View>
                <View>
                    <C 
                        ref='C_2'/>
                </View>
            </ViewPager>
        );
    }
}

export default Pages;