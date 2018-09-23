'use strict'
import React, { Component } from 'react';
import {
    StyleSheet
} from 'react-native';

import TabBar from './TabBar';
import { dispatch } from 'febrest';
class Main extends Component {
    static routeConfig = {
        name: 'Main'
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
    }

    componentDidMount() {
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <TabBar style={styles.wrapper} />
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    }
})
export default Main;