'use strict'
import {Theme} from 'react-native-improver';
import BaseTheme from './views/themes/BaseTheme';
import {NativeManager} from './native';
import BuildConfig from './BuildConfig';
import {
    useProvider,
    injectProvider,
    createActions,
    onError
}  from 'febrest';

require('./router');
import action from './action';
//设置主题
Theme.setTheme(BaseTheme);

createActions(action)



onError(function(error){
    throw error;
    return true;
})