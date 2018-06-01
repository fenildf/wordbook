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
import WordsProvider from './providers/WordsProvider';
import providerConfigs from './providers/configs';
//设置主题
Theme.setTheme(BaseTheme);

createActions(action)

useProvider('word',WordsProvider);
injectProvider(providerConfigs);

onError(function(error){
    throw error;
    return true;
})
