import React,{Component} from 'react'
import WebView from './../WebView';

class Voice extends Component{
    constructor(...props);
    render(){

        let html = assembleHTML();
        return (
            <WebView 
                source={html}/> 
        );
    }
}


export default Voice;