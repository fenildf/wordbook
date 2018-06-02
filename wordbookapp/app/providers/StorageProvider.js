'use strict'

import { AsyncStorage } from 'react-native';

import { Provider } from 'febrest'

const PERFIX = 'StorageProvider_';
class StorageProvider extends Provider {
    constructor(config) {
        super(config);
        this.synced = false;
        this.key = PERFIX + this.name;
    }
    getState() {
        if (this.synced) {
            return super.getState();
        } else {
            return AsyncStorage.getItem(this.key).then((v)=>{
                let state;
                if(v && v!='0'){
                    try {
                        state = JSON.parse(v);
                    }catch(e){
                        state = v;
                    }
                    this.state = state;
                }
                this.synced = true;
                return super.getState();
            });
        }
        return this.state;
    }
    setState(state) {
        super.setState(state);
        let v;
        try {
            v = JSON.stringify(state);
        } catch (e) {
            v = state;
        }
        return AsyncStorage.setItem(this.key, v);
    }
}

export default StorageProvider;