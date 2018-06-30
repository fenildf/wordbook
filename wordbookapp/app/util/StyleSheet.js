import {StyleSheet as SH} from 'react-native';

import {Theme} from 'react-native-improver';

let  StyleSheet = Object.create(SH);


let _theme = {};
let _baseTheme = {};
let _currentTheme = {};

let _updater ;
function setTheme(theme){
    _theme = theme;
    _currentTheme = Object.assign({},_baseTheme,_theme);
    createStyleSheet();
}
function setBaseTheme(baseTheme){
    _baseTheme = baseTheme;
    _currentTheme = Object.assign({},_baseTheme,_theme);
    createStyleSheet();
}

const STYLE_CREATOR_LIST = [];

function createStyleSheet(){
    if(_updater){
        return _updater;
    }
    _updater = new Promise((res)=>{
        setTimeout(()=>{
            STYLE_CREATOR_LIST.forEach(f=>{
                f();
            });
            _updater = undefined;
            res();
        },0)
    });
    return _updater;
    
   
}
StyleSheet.create = function(func){
    let id = STYLE_CREATOR_LIST.length;
    let _sh = {};
    let creator = function(){
        return SH.create(func(_currentTheme));
    }
    STYLE_CREATOR_LIST.push(creator);
    _sh = creator();
    let sh = {};
    for(let o in _sh){
        Object.defineProperty(sh,o,{get:()=>_sh[o]});
    }
    return sh;
}

StyleSheet.setBaseTheme = setBaseTheme;
StyleSheet.setTheme = setTheme;
export default StyleSheet;