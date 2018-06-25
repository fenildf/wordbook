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
    let screen = NavigationManager.getCurrentScreen();
    switch (key) {
        case actions.TOAST:
            screen.toast(state.message||state);
            return;
        case actions.ALERT:
            screen.alert(state);
            return;
        case actions.POPUP:
            screen.showPopup(state);
            return;
        default:
            return;
    }
})