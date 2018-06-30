'use strict'
import {
    useProvider,
    injectProvider,
    createActions,
    onError
}  from 'febrest';

require('./router');
require('./ui');
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

/**
 * polyfill 到时候要移除
 */
let promiseThen = Promise.prototype.then;

 Promise.prototype.then = function(fn1,fn2){
     
    return promiseThen.call(this,function(data){
        if(fn1){
            try{
                return fn1.call(null,data);
            }catch(e){
                alert(e.message)
            }
        }else{
            return data;
        }
    },function(data){
        if(fn2){
            try{
                return fn2.call(null,data);
            }catch(e){
                alert(e.message)
            }
        }else{
            return data;
        }
    });
 }