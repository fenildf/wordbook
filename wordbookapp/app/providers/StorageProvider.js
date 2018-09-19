'use strict'

import { AsyncStorage } from 'react-native';

import { Provider } from 'febrest'

const PERFIX = 'StorageProvider_';
class StorageProvider extends Provider {
    constructor(config) {
        super(config);
        this.key = PERFIX + this.name;
    }
    onCreate(state) {
        return AsyncStorage.getItem(this.key).then((v)=>{
            let state;
            if(v && v!='0'){
                try {
                    state = JSON.parse(v);
                }catch(e){
                    state = v;
                }
            }
            return state;
        });
    }
    query(state,action,payload) {
        return state;
    }
    update(state,action,payload) {
        let v;
        try {
            v = JSON.stringify(state);
        } catch (e) {
            v = state;
        }
        return AsyncStorage.setItem(this.key, v).then(()=>state);
    }
}

export default StorageProvider;