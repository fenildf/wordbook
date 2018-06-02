const URL = 'https://www.iciba.com/index.php?a=getWordMean&c=search&word=';

import {Provider} from 'febrest';

function getMeaning(word){
    return fetch(URL+word).then(function(response){
        return response.json();
    });
}
class MeaningProvider extends Provider{
    constructor(config){
        super(config);
    }
    getState(){
        return getMeaning;
    }
    setState(){
        return;
    }
}

export default MeaningProvider;