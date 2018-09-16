import React, { Component } from 'react'
import WebView from './../WebView';
import assembleHTML from './assembleHTML';
import TouchableOpacity from '../TouchableOpacity';
import {View} from 'react-native'
let CURRENT_PALYER;

class Voice extends Component {
    constructor(...props) {
        super(...props);
        this._playWating;
    }
    componentDidMount() {
        this.refs.webview.injectMethod('play', this._onPlay);
        this.refs.webview.injectMethod('end', this._onEnd);
    }
    componentWillUnmount() {
        if (CURRENT_PALYER === this) {
            CURRENT_PALYER = void (0);
        }
    }
    stop() {
        this._playWating && this._playWating();
        this._playWating = undefined;
        this.refs.webview.invokeMethod('stop');
    }
    _onPlay = () => {

    }
    _onEnd = () => {
        this._playWating && this._playWating();
        this._playWating = undefined;
        this.props.onEnd && this.props.onEnd();
    }
    play() {
        return new Promise((resolve)=>{
            if (CURRENT_PALYER) {
                CURRENT_PALYER.stop();
            }
            CURRENT_PALYER = this;
            this.refs.webview.invokeMethod('play');
            this._playWating = resolve;
        });
        
    }
    _play = () => {
        this.play();
    }
    render() {

        let html = assembleHTML(this.props.voice);
        let { style, iconStyle, children } = this.props;
        return (
            <TouchableOpacity
                onPress={this._play}
                style={style}>
                {children}
                <View
                    style={[{height: 38, width: 40,padding:10,flex:1,alignItems:'flex-end'},iconStyle]}>
                    <WebView
                        ref='webview'
                        style={[{ backgroundColor: 'transparent',width: 20}]}
                        mediaPlaybackRequiresUserAction={false}
                        source={{ html }} />
                </View>
            </TouchableOpacity>

        );
    }
}


export default Voice;