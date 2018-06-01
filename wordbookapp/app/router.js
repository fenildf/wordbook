'use strict'
import {
    subscribe
} from 'febrest';
import actions from './constants/actions';
import NavigationManager from './util/NavigationManager';

subscribe(function (data) {
    let {
        key,
        state
    } = data;
    if (key === actions.APP_NAVIGATE) {
        switch (state.routeName) {
            default:
                NavigationManager.navigate(state.routeName, state.params);
                return;
        }
    }else if(key === actions.APP_NAVIGATE_GOBACK){
        NavigationManager.goBack();
    }
})