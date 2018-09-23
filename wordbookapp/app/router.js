'use strict'
import {
    subscribe
} from 'febrest';
import actions from './constants/actions';
import NavigationManager from './util/NavigationManager';

subscribe(function (event) {
    let {
        key,
        data
    } = event;
    if (key === actions.APP_NAVIGATE) {
        switch (data.routeName) {
            default:
                NavigationManager.navigate(data.routeName, data.params);
                return;
        }
    }else if(key === actions.APP_NAVIGATE_GOBACK){
        NavigationManager.goBack();
    }
})