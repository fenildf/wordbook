'use strict'
import config from './config';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppState,
    InteractionManager,
    TouchableOpacity,
} from 'react-native';
import { Theme } from 'react-native-improver';
var currentTheme = Theme.getTheme();
import routes from './routes';
import { NativeManager } from './native';
import createStackNavigator from './util/createStackNavigator';
import Screen from './views/components/Screen';
import {createDispatcher} from 'react-febrest';

class Entry extends Component {
    constructor(...props) {
        super(...props);
        global.APPContext = this;
        this._isLoginPopupShow = false;
        this._loginPopupId;
        this._isLoadinViewShow = false;
        this.state = {
            inited: false,
            navigation: null,
            navigationKey: 0
        }

    }
    componentWillMount() {

    }
    componentDidMount() {
        APPContext.Routes = routes;

        InteractionManager.runAfterInteractions(() => {

            let initialRouteName = NativeManager.ENV === 'DEBUG' ? 'PageList' : 'Main';
            this.state.navigation = createStackNavigator(routes,{initialRouteName});
            this.setState({ inited: true });
            InteractionManager.runAfterInteractions(() => NativeManager.hideLoadingView())
        });

    }
    resetNavigator(initialRouteName, initialRouteParams) {
        initialRouteName = initialRouteName || NativeManager.ENV === 'DEBUG' ? 'PageList' : 'Main';
        this.setState({
            inited: true,
            navigationKey: this.state.navigationKey + 1,
            navigation: createStackNavigator(routes,{initialRouteName,initialRouteParams})
        });
    }
    render() {
        var Navigation = this.state.navigation;
        if (!this.state.inited) {
            return null;
        }
        return <Navigation />
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: currentTheme.backgroundColor,
        flex: 1,
        flexDirection: 'column'
    }
});

export default Screen(Entry);