



function bridge(){
    var id = 1;
    var callbacks = [];

    window.invokeMethod = function(methodName,params,callback){
        var message = {
            id:id,
            method:methodName,
            params:params,
        }
        id++;
        window.postMessage(JSON.stringify(message),'*');
    }

    window.document.addEventListener('message',function(data){

    });
}

function assembleJavaScript(userJavaScript){

}

export default assembleJavaScript;