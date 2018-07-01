import React, { Component } from 'react'
import WebView from './../WebView';
import assembleHTML from './assembleHTML';
import TouchableOpacity from '../TouchableOpacity';

let CURRENT_PALYER;

class Voice extends Component {
    constructor(...props) {
        super(...props);
    }
    componentDidMount(){
        this.refs.webview.injectMethod('play', this._onPlay);
    }
    componentWillUnmount() {
        if(CURRENT_PALYER===this){
            CURRENT_PALYER = void(0);
        }
    }
    stop() {
        this.refs.webview.invokeMethod('stop');
    }
    _onPlay = () => {

    }
    play(){
        if(CURRENT_PALYER){
            CURRENT_PALYER.stop();
        }
        CURRENT_PALYER = this;
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
                    style={{flex:1,backgroundColor:'transparent'}}
                    mediaPlaybackRequiresUserAction={false}
                    source={{ html }} />
            </TouchableOpacity>
            
        );
    }
}


export default Voice;