import React,{Component} from 'react'
import WebView from './../WebView';
import assembleHTML from './assembleHTML';

class Voice extends Component{
    constructor(...props){
        super(...props);
    }
    render(){

        let html = assembleHTML(this.props.voice);
        return (
            <WebView
                style={this.props.style}
                source={{html}}/> 
        );
    }
}


export default Voice;