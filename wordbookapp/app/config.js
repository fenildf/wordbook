'use strict'
import {NativeManager} from './native';
import BuildConfig from './BuildConfig';
require('./views/themes');
import {
    useProvider,
    injectProvider,
    createActions,
    onError
}  from 'febrest';

require('./router');
import action from './action';
import WordsProvider from './providers/WordsProvider';

import StorageProvider from './providers/StorageProvider';

import MeaningProvider from './providers/MeaningProvider';

import providerConfigs from './providers/configs';


createActions(action)

useProvider('word',WordsProvider);
useProvider('storage',StorageProvider);
useProvider('meaning',MeaningProvider);

injectProvider(providerConfigs);

onError(function(error){
    throw error;
    return true;
})
