import React, { Component } from 'react'
import WebView from './../WebView';
import assembleHTML from './assembleHTML';
import TouchableOpacity from '../TouchableOpacity';

class Voice extends Component {
    constructor(...props) {
        super(...props);
    }
    componentDidMount(){
        this.refs.webview.injectMethod('play', this._onPlay);
    }
    componentWillUnmount() {

    }
    stop() {
        this.refs.webview.invokeMethod('stop');
    }
    _onPlay = () => {

    }
    play(){
        this.refs.webview.invokeMethod('play'); 
    }
    _play=()=>{
        this.play();
    }
    render() {

        let html = assembleHTML(this.props.voice);
        return (
            <TouchableOpacity
                onPress={this._play}
                style={this.props.style}>
                <WebView
                    ref='webview'
                    mediaPlaybackRequiresUserAction={false}
                    source={{ html }} />
            </TouchableOpacity>
            
        );
    }
}


export default Voice;