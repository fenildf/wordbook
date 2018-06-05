import React,{Component} from 'react'

import {WebView as Web} from 'react-native';



class WebView extends Component{
    constructor(...props){
        super(...props);
    }
    render(){
        let props = this.props;
        let injectedJavaScript = props.injectedJavaScript;
        return (
            <Web 
                {...props}
                injectedJavaScript={}
                />
        )
    }
}