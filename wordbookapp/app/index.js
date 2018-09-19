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
let currentTheme = Theme.getTheme();
import routes from './views/pages';
import { NativeManager } from './native';
import NavigationManager from './util/NavigationManager';
import Screen from './views/components/Screen';
import actions from './constants/actions';
import { dispatch, subscribe, unsubscribe } from 'febrest';

class Entry extends Component {
    constructor(...props) {
        super(...props);
        global.APPContext = this;
        this.state = {
            init: false,
            navigation: null,
        }
        subscribe(this._onData)
    }
    _onData = (data) => {
        switch (data.key) {
            case actions.APP_RESET_NAVIGATOR:
                this.resetNavigator(state.routeName);
                return true;
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (!prevState.init && this.state.init) {
            InteractionManager.runAfterInteractions(() => NativeManager.hideLoadingView())
        }
    }
    componentWillUnmount() {
        unsubscribe(this._onData);
    }
    componentDidMount() {
        APPContext.Routes = routes;

        InteractionManager.runAfterInteractions(() => {
            dispatch(actions.APP_INIT).then((data) => {
                let initialRouteName = NativeManager.ENV === 'DEBUG' ? 'PageList' : 'Main';
                this.state.navigation = NavigationManager.createStackNavigator(routes, { initialRouteName });
                this.state.init = true;
                this.forceUpdate();
            });
        });

    }

    resetNavigator(initialRouteName, initialRouteParams) {
        initialRouteName = initialRouteName || NativeManager.ENV === 'DEBUG' ? 'PageList' : 'Main';
        this.setState({
            navigation: NavigationManager.createStackNavigator(routes, { initialRouteName, initialRouteParams })
        });
    }
    render() {
        var Navigation = this.state.navigation;
        if (!this.state.init) {
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