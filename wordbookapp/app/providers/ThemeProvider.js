
import {Provider} from 'febrest';
import BaseTheme from './../views/themes/BaseTheme'
import BlackTheme from './../views/themes/BlackTheme'

class ThemeProvider extends Provider{
    constructor(config){
        super(config);
    }
    getState($payload){
        let payload = $payload();
        switch (payload){
            case 'black':
                return BlackTheme;
            default:
                return BaseTheme;
        }
    }
    setState(){
        return;
    }
}

export default ThemeProvider;