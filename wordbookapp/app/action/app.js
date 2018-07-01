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
    },
    {
        key:actions.TOAST,
        controller:app.trans
    },
    {
        key:actions.ALERT,
        controller:app.trans
    },
    {
        key:actions.POPUP,
        controller:app.trans
    },
    {
        key:actions.SET_THEME,
        controller:app.setTheme
    },
    {
        key:actions.SET_WORD_PAGE_THEME,
        controller:app.setWordPageTheme
    },
    {
        key:actions.SET_AUTO_TRANSLATE,
        controller:app.setAutoTranslate
    },
    {
        key:actions.APP_UPDATE_HEADER,
        controller:app.trans
    }
]