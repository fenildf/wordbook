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
import routes from './views/pages';
import { NativeManager } from './native';
import NavigationManager from './util/NavigationManager';
import Screen from './views/components/Screen';
import { createDispatcher } from 'react-febrest';
import actions from './constants/actions';

class Entry extends Component {
    constructor(...props) {
        super(...props);
        global.APPContext = this;
        this._isLoginPopupShow = false;
        this._loginPopupId;
        this._isLoadinViewShow = false;
        this.state = {
            init: false,
            navigation: null,
            navigationKey: 0
        }
        this.dispatcher = createDispatcher(this, this._onData);

    }
    _onData(data, isThis) {
        switch (data.key) {
            case actions.APP_INIT:
                let initialRouteName = NativeManager.ENV === 'DEBUG' ? 'PageList' : 'Main';
                this.state.navigation = NavigationManager.createStackNavigator(routes, { initialRouteName });
                return false;
            case actions.APP_RESET_NAVIGATOR:
                this.resetNavigator(state.routeName);
                return true;

        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(!prevState.init&&this.state.init){
            InteractionManager.runAfterInteractions(() => NativeManager.hideLoadingView())
        }
    }
    
    componentDidMount() {
        APPContext.Routes = routes;

        InteractionManager.runAfterInteractions(() => {
            this.dispatcher.dispatch(actions.APP_INIT);
        });

    }

    resetNavigator(initialRouteName, initialRouteParams) {
        initialRouteName = initialRouteName || NativeManager.ENV === 'DEBUG' ? 'PageList' : 'Main';
        this.setState({
            init: true,
            navigationKey: this.state.navigationKey + 1,
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