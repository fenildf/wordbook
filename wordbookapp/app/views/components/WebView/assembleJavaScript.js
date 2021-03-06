
function bridge() {
    var callbacks = [];

    var methods = {

    }

    var originalPostMessage = window.postMessage;
    var patchedPostMessage = function (message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
    };
    patchedPostMessage.toString = function () {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    };
    window.postMessage = patchedPostMessage;

    window.nativeWebView = {
        invokeMethod: function (methodName, params, callback) {
            var message = {
                method: methodName,
                params: params||[],
                type:'invokeMethod'
            }
            if (callback) {
                callbacks.push(callback);
                message.callback = callbacks.length - 1;
            }
            window.postMessage(JSON.stringify(message),'*');

        },
        injectMethod:function(methodName,method){
            methods[methodName] = method;
        }
    }
    window.nativeWebView.invokeMethod.toString = function(){
        return 'function invokeMethod() { [native code] }'
    }
    window.nativeWebView.injectMethod.toString = function(){
        return 'function injectMethod() { [native code] }'
    }
    window.document.addEventListener('message', function (event) {
        try{
            data = JSON.parse(event.data);
            switch (data.type){
                case 'invokeMethod':
                    if(data.method){
                        methods[data.method].apply(null,data.params);
                    }
                    break;
                case 'invokeMethodCallback':
                    if(data.callback){
                        callbacks[data.callback].apply(null,data.params);
                        delete  callbacks[data.callback];
                    }
                    break;
            }
            
        }catch(e){

        }
    });
    document.onNativeLoad && document.onNativeLoad();
    document.onNativeLoad = undefined;
}

function assembleJavaScript(userJavaScript) {
    return `
    (${bridge.toString()})();
    ${userJavaScript||''}
    `
}

export default assembleJavaScript;