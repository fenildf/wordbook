function appInit(){
    return {
        init:true
    }
}

function appNavigate($payload){
    return $payload();

}
export default {
    appInit,
    appNavigate
}