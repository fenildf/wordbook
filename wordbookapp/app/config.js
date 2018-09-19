'use strict'
import {
    registerProvider,
    registerAction,
    onError
}  from 'febrest';

require('./router');
require('./ui');
import action from './action';


import providerConfigs from './providers/configs';


registerAction(action)

registerProvider(providerConfigs);

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
                console.warn(e)
            }
        }else{
            return data;
        }
    },function(data){
        if(fn2){
            try{
                return fn2.call(null,data);
            }catch(e){
                console.warn(e)
            }
        }else{
            return data;
        }
    });
 }