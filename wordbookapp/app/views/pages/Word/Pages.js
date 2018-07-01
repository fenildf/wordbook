'use strict'
import React, { Component } from 'react';
import {
    View,
} from 'react-native';

import {
    ViewPager,
} from 'react-native-awesome-viewpager';
import Page from './Page';

class Pages extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            offset: 0
        }
        this._position = 0;

    }
    _setPage(page) {
        if (page===undefined) {
            return;
        }
        this._position = page;
        this.refs['VIEWPAGER_REF'].setPageWithoutAnimation(page);
    }
    _onPageSelected = (event) => {
        let { position } = event.nativeEvent;
    }
    _onNext(i){
        let {dataSource} = this.props;
        let l = dataSource.length;
        if(i>=l){
            return;
        }else{
            this._setPage(++i);
        }
    }
    _renderPages(dataSource){
        return dataSource.map((item,i)=>{
            return (
                <View
                    key={item.name}>
                    <Page 
                        onNext={()=>this._onNext(i)}
                        word={item}/>
                </View>
            );
        });
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
                style={this.props.style}>
               {this._renderPages(dataSource)}
            </ViewPager>
        );
    }
}

export default Pages;