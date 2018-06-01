'use strict'
import app from './../controller/app';
import actions from './../constants/actions';

export default [
    {
        key:actions.APP_INIT,
        controller:app.appInit
    },
    {
        key:actions.APP_NAVIGATE,
        controller:app.appNavigate
    },
    {
        key:actions.APP_NAVIGATE_GOBACK,
        controller:app.appNavigate
    },
    {
        key:actions.APP_RESET_NAVIGATOR,
        controller:app.appNavigate
    }
]