import React from 'react';

import {Text as RNText} from 'react-native';
import StyleSheet from 'react-native-theme-stylesheet';

const styles = StyleSheet.create(function(theme){
    return {
        defaultStyle : {
            fontSize:14,
            fontWeight:'200',
            color:'#333'
        }
    }
})
class Text extends RNText{
    render(){
        return React.cloneElement(super.render(),{style:[styles.defaultStyle,this.props.style]})
    }
}

export default Text;