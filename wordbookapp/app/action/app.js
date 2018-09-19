'use strict'
import app from './../controller/app';
import actions from './../constants/actions';
import word from '../controller/word';

export default [
    {
        name:actions.APP_INIT,
        controller:app.appInit
    },
    {
        name:actions.APP_NAVIGATE,
        controller:app.appNavigate
    },
    {
        name:actions.APP_NAVIGATE_GOBACK,
        controller:app.appNavigate
    },
    {
        name:actions.APP_RESET_NAVIGATOR,
        controller:app.appNavigate
    },
    {
        name:actions.TOAST,
        controller:app.trans
    },
    {
        name:actions.ALERT,
        controller:app.trans
    },
    {
        name:actions.POPUP,
        controller:app.trans
    },
    {
        name:actions.SET_THEME,
        controller:app.setTheme
    },
    {
        name:actions.SET_WORD_PAGE_THEME,
        controller:app.setWordPageTheme
    },
    {
        name:actions.SET_AUTO_TRANSLATE,
        controller:app.setAutoTranslate
    },
    {
        name:actions.APP_UPDATE_HEADER,
        controller:app.trans
    },
    {
        name:actions.APP_WORD_BOOK,
        controller:word.wordBook
    }
]