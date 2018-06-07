import React, { Component } from 'react'
import WebView from './../WebView';
import assembleHTML from './assembleHTML';

const VOICES = [];
class Voice extends Component {
    constructor(...props) {
        super(...props);
        VOICES.push(this);   
    }
    componentDidMount(){
        this.refs.webview.injectMethod('play', this._onPlay);
    }
    componentWillUnmount() {
        for(let i =0;i<VOICES.length;i++){
            if(VOICES[i]===this){
                VOICES.splice(i,1);
                return;
            }
        }
    }
    stop() {
        this.refs.webview.invokeMethod('stop');
    }
    _onPlay = () => {
        VOICES.forEach((voice) => {
            if (voice !== this) {
                voice.stop();
            }
        })
    }
    render() {

        let html = assembleHTML(this.props.voice);
        return (
            <WebView
                style={this.props.style}
                ref='webview'
                mediaPlaybackRequiresUserAction={false}
                source={{ html }} />
        );
    }
}


export default Voice;