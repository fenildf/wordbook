import React from 'react';

import {Text as RNText} from 'react-native';
import StyleSheet from './../../../util/StyleSheet';

const styles = StyleSheet.create(function(theme){
    return {
        defaultStyle : {
            fontSize:14,
            fontWeight:'200',
            color:'#333'
        }
    }
})
const 
class Text extends RNText{
    render(){
        return React.cloneElement(super.render(),{style:[styles.defaultStyle,this.props.style]})
    }
}

export default Text;