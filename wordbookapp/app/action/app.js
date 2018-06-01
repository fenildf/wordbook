'use strict'
import app from './../controller/app';
import actions from './../constants/actions';

export default [
    {
        key:actions.APP_INIT,
        controller:app.appInit
    }
]