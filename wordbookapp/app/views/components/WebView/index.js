import React, { Component } from 'react'

import { WebView as Web } from 'react-native';

import assemebleJavaScript from './assembleJavaScript';

const WEB_REF = 'WEB_REF';

class WebView extends Component {
    constructor(...props) {
        super(...props);
        this.state = {

        }
        this._callbacks = [];
        this._methods = {

        }
    }
    componentWillUnmount() {
        this._callbacks = [];
        this._methods = null;
    }
    execJavascript(js) {

    }
    invokeMethod(method, params, callback) {
        let data = {method,params, type: 'invokeMethod'};
        if(callback){
            this._callbacks.push(callback);
            data.callback = this._callbacks.length-1;
        }
        this._postData(data);
    }
    injectMethod(methodName, method) {
        this._methods[methodName] = method;
    }
    _postData(data) {
        this.refs[WEB_REF].postMessage(JSON.stringify(data));
    }
    _onMessage = ({ nativeEvent }) => {
        try {
            data = JSON.parse(data);
            switch (data.type) {
                case 'invokeMethod':
                    let method = this._methods[data.method];
                    if (method) {
                        Promise.resolve(method.apply(null, data.params)).then((result)=>{
                            this._postData({
                                callback
                            })
                        });
                    }
                case 'invokeMethodCallback':
                    let callback = this._callbacks[data.callback];
                    if (callback) {
                        callback.call(null, data.params);
                        delete this._callbacks[data.callback];
                    }
            }

        } catch (e) {

        }



    }
    render() {
        let props = this.props;
        let injectedJavaScript = props.injectedJavaScript;
        return (
            <Web
                ref={WEB_REF}
                bounces={false}
                {...props}
                source={{ html: '<div>123456</div>' }}
                onMessage={this._onMessage}
                injectedJavaScript={assemebleJavaScript(injectedJavaScript)}
            />
        )
    }
}

export default WebView;