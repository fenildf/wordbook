'use strict'
import React,{Component} from 'react';
import {
    StyleSheet
} from 'react-native';

import { createDispatcher } from 'react-febrest';
import { dispatch } from 'febrest';
import actions from '../../../constants/actions';
import TabBar from './TabBar';

class Main extends Component {
    static routeConfig = {
        name:'Main'
    }
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '单词本',
            header: null
        }
        this.state = {
            books: []
        }
        this.dispatcher = createDispatcher(this, this._onData);
    }
    
    _onData(data) {
    }

    componentDidMount() {
    }
    componentWillUnmount() {
        this.dispatcher.release();
    }
    render() {
        return (
            <TabBar style={styles.wrapper}/>
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    }
})
export default Main;