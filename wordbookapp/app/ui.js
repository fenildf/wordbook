'use strict'
import {
    subscribe
} from 'febrest';
import actions from './constants/actions';
import NavigationManager from './util/NavigationManager';

subscribe(function (evt) {
    let {
        key,
        data
    } = evt;
    let screen = NavigationManager.getCurrentScreen();
    switch (key) {
        case actions.TOAST:
            screen.toast(data.message||data);
            return;
        case actions.ALERT:
            screen.alert(data);
            return;
        case actions.POPUP:
            screen.showPopup(data);
            return;
        default:
            return;
    }
})